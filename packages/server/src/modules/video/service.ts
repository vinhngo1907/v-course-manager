import { DatabaseService } from '@modules/database/service';
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { VideoDTO } from './dto/video';
import { VideoCreationDTO } from './dto/create-video.dto';
import { catchError } from 'rxjs';
import { CourseService } from '@modules/course/service';
import { VideoBadRequestException } from './exception';

@Injectable()
export class VideoService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: Logger,
        private readonly courseService: CourseService,
    ) { }

    async findVideosByCourse(courseId: string): Promise<VideoDTO[]> {
        try {
            const videos = this.databaseService.course.findMany({
                where: {
                    id: courseId
                },
                include: {
                    videos: true
                }
            });

            return videos;
        } catch (error: any) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(videoId: string): Promise<VideoDTO> {
        try {
            return await this.databaseService.video.findFirst({
                where: {
                    id: videoId
                }
            });
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async create(createVideoDto: VideoCreationDTO): Promise<VideoCreationDTO> {
        try {
            const { courseId, ...videoData } = createVideoDto;

            let data: any = {
                ...videoData,
            };

            if (courseId) {
                const course = await this.courseService.findOne(courseId);
                if (!course) {
                    throw new VideoBadRequestException("Course does not exist");
                }
                data['course'] = {connect:{ id: course.id }};
            }

            const newVideo = await this.databaseService.video.create({
                data,
                include: { course: true },
            });

            return newVideo;
        } catch (error) {
            this.logger.error(error);
            catchError(error);
        }
    }
}
