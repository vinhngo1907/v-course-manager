import { DatabaseService } from "@modules/database/service";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CrudRequest } from "@nestjsx/crud";
import { Comment, Prisma } from "@prisma/client";
import { CommentCreationDTO } from "./dto/create-comment.dto";
import { CommentBadRequestException } from "./exception";
import { VideoNotFoundException } from "@modules/video/exception";

@Injectable()
export class CommentsService {
	constructor(
		private readonly databaseService: DatabaseService,
		private readonly logger: Logger,
	) {
		this.logger = new Logger(DatabaseService.name);
	}


	private getOrderBy(sort: string): Prisma.CommentOrderByWithRelationInput {
		if (sort === 'oldest') {
			return { createdAt: 'asc' };
		}
		if (sort === 'top') {
			return { likes: 'desc' };
		}
		return { createdAt: 'desc' }; // newest (default)
	}

	async findAll(req: CrudRequest): Promise<{
		data: Comment[],
		total: number,
		page: number,
		pageCount: number,
		limit: number
	}> {
		try {
			const prisma = this.databaseService;

			const page = req.parsed.page || 1;
			const limit = req.parsed.limit || 20;
			const skip = (page - 1) * limit;

			const filter = req.parsed.filter || [];
			
			// Ex: ?filter=lessonId||$eq||abc hoặc ?filter=videoId||$eq||xyz
			const where: Prisma.CommentWhereInput = {};
			let sort = 'newest'; // Default sort

			filter.forEach((f) => {
				// if (f.field === "lessonId") where.lessonId = f.value;
				if (f.field === "videoId") where.videoId = f.value;
				if (f.field === "sort") sort = f.value;
			});

			const [total, data] = await prisma.$transaction([
				prisma.comment.count({ where }),
				prisma.comment.findMany({
					where,
					include: {
						author: true,
						reactions: true,
						replies: true,
					},
					skip,
					take: limit,
					// orderBy: {
					// 	createdAt: "desc",
					// },
					orderBy: this.getOrderBy(sort)
				}),
			]);

			return {
				data,
				total,
				page,
				pageCount: Math.ceil(total / limit),
				limit,
			};
		} catch (error) {
			this.logger.error(error.message);
			throw new InternalServerErrorException(error);
		}
	}

	async findAllByVideoId(videoId: string, sort = 'newest') {
		return this.databaseService.comment.findMany({
			where: { videoId },
			include: {
				author: true,
			},
			orderBy: this.getOrderBy(sort),
		});
	}

	async addComment(dto: CommentCreationDTO, userId: string) {
		const prisma = this.databaseService;
		try {
			const { parentId, videoId, tags } = dto;
			if (parentId) {
				const cm = await prisma.comment.findFirst({
					where: { id: parentId }
				})

				if (!cm) throw new CommentBadRequestException("This comment does not exist")
			}
			const video = await prisma.video.findFirst({
				where: {
					id: videoId
				}
			});

			if (!video) {
				throw new VideoNotFoundException("This video does not exist");
			}

			const comment = await prisma.comment.create({
				data: {
					content: dto.content,
					// lessonId: dto.lessonId,
					videoId: videoId,
					parentId: parentId,
					authorId: userId,
					// Nếu muốn lưu tags riêng, tạo thêm bảng CommentTag và insert ở đây.
				},
				include: {
					author: true,
				},
			});

			await prisma.video.update({
				where: {
					id: videoId
				},
				data: {
					comments: { connect: { id: comment.id } }
				}
			});

			if (tags?.length) {
				for (const tag of tags) {
					// tag might be username -> find userId
					const user = await prisma.user.findFirst({
						where: { account: { username: tag } },
					});
					if (user) {
						await prisma.commentTag.create({
							data: {
								commentId: comment.id,
								userId: user.id,
							},
						});
					}
				}
			}

			return comment;
		} catch (error) {
			console.log("Error: ", error)
			this.logger.error(error.message);
			throw new InternalServerErrorException(error);
		}
	}

}