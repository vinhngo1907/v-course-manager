import { DatabaseService } from '@modules/database/service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  // UnauthorizedException,
} from '@nestjs/common';
import { VideoDTO } from './dto/video';
import { VideoCreationDTO } from './dto/create-video.dto';
import { CourseService } from '@modules/course/service';
import { VideoBadRequestException } from './exception';
// import { LessonUpdateDTO } from './dto/lesson';
// import { CourseNotFoundException } from '@modules/course/exception';
// import { MuxService } from 'src/config/mux';

@Injectable()
export class VideoService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly logger: Logger,
    private readonly courseService: CourseService, // private readonly muxService: MuxService,
  ) {}

  async findVideosByCourse(courseId: string): Promise<VideoDTO[]> {
    try {
      const course = await this.databaseService.course.findUnique({
        where: { id: courseId },
        select: {
          lessons: {
            include: { videos: true },
          },
        },
      });

      if (!course) return [];

      const videoDTOs: VideoDTO[] = course.lessons.flatMap((lesson) =>
        lesson.videos.map((video) => ({
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail ?? '',
          vieoUrl: video.videoUrl,
          subtitles: [],
          lessonId: video.lessonId ?? '',
          // ownerId: video.ownerId,
          duration: video.duration,
        })),
      );

      return videoDTOs;
    } catch (error: any) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(videoId: string): Promise<VideoDTO> {
    try {
      return await this.databaseService.video.findFirst({
        where: {
          id: videoId,
        },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async findVideoByLesson(lessonId: string): Promise<VideoDTO | null> {
    try {
      return await this.databaseService.video.findFirst({
        where: {
          lessonId: lessonId,
        },
        include: { lesson: true },
      });
    } catch (error: any) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  // async findOneWithVideo(lessonId: string): Promise<LessonDTO | null> {
  //   try {
  //     return await this.databaseService.lesson.findUnique({
  //       where: { id: lessonId },
  //       include: { videos: true },
  //     });
  //   } catch (error) {
  //     this.logger.error(error.message);
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async createProgress(lessonId: string, userId: string) {
  //   return this.databaseService.userLessonProgress.create({
  //     data: {
  //       userId,
  //       lessonId,
  //     },
  //   });
  // }

  async getChapterByLesson(lessonId: string, userId: string) {
    if (!userId) throw new UnauthorizedException('Unauthorized');

    return await this.databaseService.lesson.findUnique({
      where: { id: lessonId },
      include: {
        videos: {
          include: {
            muxData: true,
          },
        },
      },
    });
  }

  // async removeProgress(lessonId: string, userId: string) {
  //   return this.databaseService.userLessonProgress.deleteMany({
  //     where: {
  //       lessonId,
  //       userId,
  //     },
  //   });
  // }

  async findAll(): Promise<VideoDTO[]> {
    try {
      return await this.databaseService.video.findMany();
    } catch (error: any) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async create(createVideoDto: VideoCreationDTO, userId: string) {
    try {
      const {
        lessonId,
        courseId,
        title,
        description,
        videoUrl,
        duration,
        thumbnailUrl,
        position,
      } = createVideoDto;

      const course = await this.courseService.findOne(courseId);
      if (!course) throw new VideoBadRequestException('Course not found');
      // console.log({ course, userId })
      if (course.createdById !== userId)
        throw new VideoBadRequestException('Not owner');

      // const newLesson = await this.databaseService.lesson.create({
      //   data: {
      //     name: title,
      //     description,
      //     course: { connect: { id: courseId } },
      //   },
      // });

      return await this.databaseService.video.create({
        data: {
          title: title,
          description,
          videoUrl,
          duration,
          thumbnail: thumbnailUrl,
          position,
          lesson: { connect: { id: lessonId } },
          // owner: { connect: { id: userId } },
        },
      });
    } catch (error) {
      // console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  // async updateLesson(data: LessonUpdateDTO, userId: string) {
  //   const { courseId, lessonId, videoUrl, thumbnailUrl, ...values } = data;
  //   if (!userId) {
  //     throw new UnauthorizedException('Unauthorized');
  //   }

  //   const courseOwner = await this.databaseService.course.findFirst({
  //     where: {
  //       id: courseId,
  //       createdById: userId,
  //     },
  //   });
  //   if (!courseOwner)
  //     throw new CourseNotFoundException(`Course ${courseId} does not exist`);

  //   const lesson = await this.databaseService.lesson.update({
  //     where: {
  //       id: lessonId,
  //     },
  //     data: {
  //       ...values,
  //     },
  //     include: {
  //       videos: { include: { muxData: true } },
  //       usersCompleted: true,
  //     },
  //   });

  //   if (videoUrl && thumbnailUrl) {
  //     const chapter = await this.create(
  //       {
  //         title: values.name,
  //         courseId,
  //         videoUrl,
  //         duration: 10,
  //         thumbnailUrl,
  //         position: 0,
  //         lessonId: lesson.id,
  //         ...data,
  //       },
  //       userId,
  //     );

  //     /*
  //        Find if the chapter already have an uploaded video in the database
  //        by checking if the id of the chapter (chapterId) matched a certain
  //        muxData in the database. If so, delete the existingMuxData on MUX
  //        and in the database
  //    */
  //     const existingMuxData = await this.databaseService.muxData.findFirst({
  //       where: {
  //         videoId: chapter.id,
  //       },
  //     });

  //     if (existingMuxData) {
  //       // await Video.Assets.del(existingMuxData.assetId);
  //       await this.muxService.deleteAsset(existingMuxData.assetId);
  //       await this.databaseService.muxData.delete({
  //         where: {
  //           id: existingMuxData.id,
  //         },
  //       });
  //     }

  //     /*
  //         Start to upload the videoUrl of the chapter (generated by the UploadThing)
  //         into MUX
  //     */
  //     const asset = await this.muxService.createAssetFromUrl(videoUrl);

  //     /*
  //         Once the upload of videoUrl of the chapter into MUX has finished proceed
  //         in storing the muxData into the database
  //     */
  //     await this.databaseService.muxData.create({
  //       data: {
  //         videoId: chapter.id,
  //         assetId: asset.id,
  //         playbackId: asset.playback_ids?.[0]?.id,
  //       },
  //     });
  //   }

  //   return lesson;
  // }

  async upsertProgress({
  userId,
  chapterId,
  isCompleted,
}: {
  userId: string;
  chapterId: string;
  isCompleted: boolean;
}) {
   if (!userId) {
      throw new UnauthorizedException();
    }
    return await this.databaseService.userVideoProgress.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId: chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        videoId: chapterId,
        isCompleted,
        duration: 0,
      },
    });
  }
}
