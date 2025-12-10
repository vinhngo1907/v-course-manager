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
  ) {}

  async findVideosByCourse(courseId: string): Promise<VideoDTO[]> {
    try {
      const courses = await this.databaseService.course.findMany({
        where: { id: courseId },
        select: {
          lessons: {
            include: { video: true },
          },
        },
      });

      const videoDTOs: VideoDTO[] = courses.flatMap((course) =>
        course.lessons
          .filter((lesson) => lesson.video != null)
          .map((lesson) => ({
            title: lesson.video.title,
            description: lesson.video.description,
            thumbnail: lesson.video.thumbnail ?? '',
            vieoUrl: lesson.video.videoUrl,
            subtitles: [],
            lessonId: lesson.video.lessonId!,
            ownerId: lesson.video.ownerId,
            duration: lesson.video.duration,
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
        include: { video: true },
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

  // async create(createVideoDto: VideoCreationDTO, userId: string): Promise<VideoCreationDTO> {
  //     try {
  //         const { courseId, ...videoData } = createVideoDto;

  //         let data: any = {
  //             ...videoData,
  //         };

  //         if (courseId) {
  //             const course = await this.courseService.findOne(courseId);
  //             if (!course) {
  //                 throw new VideoBadRequestException("Course does not exist");
  //             }

  //             if (course.createdById !== userId) {
  //                 throw new VideoBadRequestException("You don not own this course");
  //             }

  //             data['course'] = { connect: { id: course.id } };
  //         }

  //         const newVideo = await this.databaseService.video.create({
  //             data,
  //             include: { lesson: true },
  //         });

  //         return newVideo;
  //     } catch (error) {
  //         this.logger.error(error);
  //         catchError(error);
  //     }
  // }

  async create(createVideoDto: VideoCreationDTO, userId: string) {
    // console.log({createVideoDto})
    try {
      const { courseId, title, description, videoUrl, duration, thumbnailUrl } =
        createVideoDto;

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

      const newVideo = await this.databaseService.video.create({
        data: {
          title: title,
          description,
          videoUrl,
          lesson: { connect: { id: newLesson.id } },
          owner: { connect: { id: userId } },
          duration,
          thumbnail: thumbnailUrl,
        },
      });

      return newVideo;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
