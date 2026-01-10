import { DatabaseService } from '@modules/database/service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { LessonDTO, VideoDTO } from './dto/video';
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
        lesson.videos
          .map((video) => ({
            title: video.title,
            description: video.description,
            thumbnail: video.thumbnail ?? '',
            vieoUrl: video.videoUrl,
            subtitles: [],
            lessonId: video.lessonId!,
            ownerId: video.ownerId,
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
    } catch (error) {
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
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async findOneWithVideo(lessonId: string): Promise<LessonDTO | null> {
    try {
      return await this.databaseService.lesson.findUnique({
        where: { id: lessonId },
        include: { videos: true },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async createProgress(lessonId: string, userId: string) {
    return this.databaseService.userLessonProgress.create({
      data: {
        userId,
        lessonId,
      },
    });
  }

  async removeProgress(lessonId: string, userId: string) {
    return this.databaseService.userLessonProgress.deleteMany({
      where: {
        lessonId,
        userId,
      },
    });
  }

  async findAll(): Promise<VideoDTO[]> {
    try {
      return await this.databaseService.video.findMany();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async create(createVideoDto: VideoCreationDTO, userId: string) {
    try {
      const {
         courseId,
         title, description, videoUrl, duration, 
        thumbnailUrl, position 
      } = createVideoDto;

      const course = await this.courseService.findOne(courseId);
      if (!course) throw new VideoBadRequestException('Course not found');
      // console.log({ course, userId })
      if (course.createdById !== userId)
        throw new VideoBadRequestException('Not owner');

      const newLesson = await this.databaseService.lesson.create({
        data: {
          name: title,
          description,
          course: { connect: { id: courseId } },
        },
      });

      return await this.databaseService.video.create({
        data: {
          title: title,
          description,
          videoUrl,
          duration,
          thumbnail: thumbnailUrl,
          position,
          lesson: { connect: { id: newLesson.id } },
          owner: { connect: { id: userId } },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
