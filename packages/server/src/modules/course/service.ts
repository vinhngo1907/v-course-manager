import { DatabaseService } from '@modules/database/service';
import {
  // BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CourseByUser,
  // CourseDTO,
  CourseWithLessonsDTO,
  RegisterCourseDTO,
} from './dto/course';
import { CourseCreationDTO } from './dto/create-course.dto';
import { CrudRequest } from '@nestjsx/crud';
import { CourseUpdateDTO, CourseUpdatePublishDto } from './dto/update-course';
import { CourseNotFoundException } from './exception';
import { GetListCoursesQueryDto } from './dto/get-course-query.dto';
import { CourseResponseDto } from './dto/course-response.dto';
// import { LessonDTO } from '@modules/video/dto/video';
// import { LessonCreationDTO } from '@modules/video/dto/create-lesson.dto';
import { AddLessonInput } from './lesson.interface';
import { VideoBadRequestException } from '@modules/video/exception';
import { Prisma } from '@prisma/client';
import { MinioService } from 'src/config/minio';

@Injectable()
export class CourseService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly logger: Logger,
    private readonly minioService: MinioService,
  ) {}

  async getCourses(
    req: CrudRequest,
    authorId: string,
  ): Promise<{
    data: CourseWithLessonsDTO[];
    total: number;
    page: number;
    pageCount: number;
    limit: number;
  }> {
    try {
      const page = req.parsed.page || 1;
      const limit = req.parsed.limit || 20;

      const where = authorId ? { createdById: authorId } : {};

      const courses = await this.databaseService.course.findMany({
        where: {
          ...where,
          // published: true
        },
        include: {
          lessons: {
            include: { videos: true },
          },
        },
      });

      const mappedCourses: CourseWithLessonsDTO[] = courses.map((course) => {
        const totalLessons = course.lessons.length;

        const totalVideos = course.lessons.reduce(
          (sum, lesson) => sum + lesson.videos.length,
          0,
        );

        const totalDuration = course.lessons.reduce(
          (sum, lesson) =>
            sum + lesson.videos.reduce((s, v) => s + (v.duration ?? 0), 0),
          0,
        );

        return {
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnail: course.thumbnail ?? undefined,
          published: course.published,
          categoryId: course.categoryId,
          totalLessons,
          totalVideos,
          totalDuration,

          lessons: course.lessons.map((lesson) => ({
            id: lesson.id,
            name: lesson.name,
            description: lesson.description,

            totalVideos: lesson.videos.length,
            totalDuration: lesson.videos.reduce(
              (sum, v) => sum + (v.duration ?? 0),
              0,
            ),
            videos: lesson.videos.map((video) => ({
              id: video.id,
              title: video.title,
              videoUrl: video.videoUrl ?? undefined,
              // duration: video.duration,
              thumbnail: video.thumbnail ?? undefined,
              description: video.description ?? undefined,
              // videoUrl: video.videoUrl
              // ? await this.minioService.getVideoUrl(video.videoUrl)
              // : undefined,
            })),
          })),
        };
      });

      // const mappedCourses: CourseWithLessonsDTO[] = await Promise.all(
      //   courses.map(async (course) => {
      //     const totalLessons = course.lessons.length;

      //     const totalVideos = course.lessons.reduce(
      //       (sum, lesson) => sum + lesson.videos.length,
      //       0,
      //     );

      //     const totalDuration = course.lessons.reduce(
      //       (sum, lesson) =>
      //         sum + lesson.videos.reduce((s, v) => s + (v.duration ?? 0), 0),
      //       0,
      //     );

      //     return {
      //       id: course.id,
      //       title: course.title,
      //       description: course.description,
      //       thumbnail: course.thumbnail ?? undefined,
      //       published: course.published,
      //       totalLessons,
      //       totalVideos,
      //       totalDuration,

      //       lessons: await Promise.all(
      //         course.lessons.map(async (lesson) => ({
      //           id: lesson.id,
      //           name: lesson.name,
      //           description: lesson.description,

      //           totalVideos: lesson.videos.length,
      //           totalDuration: lesson.videos.reduce(
      //             (sum, v) => sum + (v.duration ?? 0),
      //             0,
      //           ),

      //           videos: await Promise.all(
      //             lesson.videos.map(async (video) => ({
      //               id: video.id,
      //               title: video.title,
      //               thumbnail: video.thumbnail ?? undefined,
      //               description: video.description ?? undefined,
      //               videoUrl: video.videoUrl
      //                 ? await this.minioService.getVideoUrl(video.videoUrl)
      //                 : undefined,
      //             }))
      //           ),
      //         }))
      //       ),
      //     };
      //   })
      // );
      return {
        data: mappedCourses,
        page,
        limit,
        total: courses.length,
        pageCount: Math.ceil(courses.length / limit),
      };
    } catch (error: any) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }
  async listCourse(query: GetListCoursesQueryDto) {
    const { page = 1, limit = 10, title, categoryId } = query;
    const where: Prisma.CourseWhereInput = {};
    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const [courses, total] = await Promise.all([
      this.databaseService.course.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        // orderBy: { createdAt: 'desc' },
        include: {
          lessons: { include: { videos: true } },
          createdBy: true,
        },
      }),
      this.databaseService.course.count({ where }),
    ]);

    const mappedCourses: CourseResponseDto[] = courses.map((course) => ({
      ...course,
      thumbnailUrl: course.thumbnail,
    }));

    return {
      data: mappedCourses,
      meta: {
        page,
        limit,
        total,
        pageCount: Math.ceil(total / limit),
      },
    };
  }
  async registerCourse(dto: RegisterCourseDTO) {
    return await this.databaseService.courseRegistration.create({
      data: {
        userId: dto.userId,
        courseId: dto.courseId,
      },
    });
  }

  async getUserRegistrations(userId: string) {
    return await this.databaseService.courseRegistration.findMany({
      where: { userId },
      include: { course: true },
    });
  }

  async getCourseById(courseId: string, userId?: string) {
    const course = await this.databaseService.course.findFirst({
      where: { id: courseId },
      include: {
        lessons: { include: { videos: true } },
        createdBy: true,
      },
    });

    if (!course) throw new CourseNotFoundException('Not found');

    let completedLessons: string[] = [];

    if (userId) {
      const progress = await this.databaseService.userLessonProgress.findMany({
        where: {
          userId: userId,
          lessonId: { in: course.lessons.map((l) => l.id) },
        },
        select: { lessonId: true },
      });
      completedLessons = progress.map((p) => p.lessonId);
    }

    return { course, completedLessons };
  }

  async unregisterCourse(dto: RegisterCourseDTO) {
    return await this.databaseService.courseRegistration.deleteMany({
      where: {
        userId: dto.userId,
        courseId: dto.courseId,
      },
    });
  }

  async deleteCourse(courseId: string) {
    try {
      console.log({ courseId });
      return await this.databaseService.course.delete({
        where: {
          id: `${courseId}`,
        },
      });
    } catch (e: any) {
      console.error('[DELETE COURSE ERROR]', e);
      throw new InternalServerErrorException(e.message);
    }
  }

  async addCourse(
    dto: CourseCreationDTO,
    userId: string,
  ): Promise<CourseCreationDTO> {
    try {
      const newCourse = await this.databaseService.course.create({
        data: {
          title: dto.title,
          description: dto.description,
          thumbnail: dto.thumbnailUrl,
          createdById: userId,
        },
      });

      return {
        ...newCourse,
        authorId: newCourse.createdById,
      };
    } catch (error: any) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async updateCourse(
    dto: CourseUpdateDTO,
    id: string,
    userId: string,
  ): Promise<any> {
    const { description, thumbnail, title, categoryId } = dto;
    console.log({ dto });
    // 👉 1. Get course
    const course = await this.databaseService.course.findUnique({
      where: { id },
    });
    if (!course) throw new CourseNotFoundException('Course not found');

    // 👉 2. Check permission
    if (course.createdById !== userId) {
      throw new ForbiddenException('Not authorized');
    }

    // 👉 3. Update
    const updatedCourse = await this.databaseService.course.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(thumbnail && { thumbnail }),
        ...(categoryId && { categoryId }),
      },
    });

    return updatedCourse;
  }

  async findOne(courseId: string) {
    return await this.databaseService.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        lessons: true,
      },
    });
  }
  async findCourseByUser(dto: CourseByUser) {
    // console.log({ dto });
    const course = await this.databaseService.course.findFirst({
      where: {
        id: dto.courseId,
        createdById: dto.userId,
      },
      include: {
        lessons: {
          include: {
            videos: true,
          },
        },
      },
    });

    return course;
  }

  async updatePublishStatus({
    courseId,
    accountId,
    published,
  }: CourseUpdatePublishDto) {
    const existedCourse = await this.databaseService.course.findFirst({
      where: { id: courseId },
      select: {
        id: true,
        createdBy: true,
      },
    });

    if (!existedCourse) throw new NotFoundException('Course does not exist');

    if (existedCourse.createdBy.id !== accountId) {
      throw new ForbiddenException('You are not owner of this course');
    }

    return this.databaseService.course.update({
      where: { id: courseId },
      data: {
        published,
      },
    });
  }

  async addLesson({ name, courseId, accountId }: AddLessonInput) {
    // 1️⃣ Authentication
    if (!accountId) {
      throw new UnauthorizedException('Unauthorized');
    }

    // 2️⃣ Authorization (check owner)
    const courseOwner = await this.databaseService.course.findUnique({
      where: { id: courseId },
      select: { createdById: true },
    });

    if (!courseOwner || courseOwner.createdById !== accountId) {
      throw new UnauthorizedException('Unauthorized');
    }

    // 4️⃣ Create lesson
    const lesson = await this.databaseService.lesson.create({
      data: {
        name,
        courseId,
        // description: "",
        published: false,
      },
    });

    // 3️⃣ Get last lesson position
    // const lastLesson = await this.databaseService.video.findFirst({
    //   where: { id: lesson.id },
    //   orderBy: {
    //     position: "desc",
    //   },
    // });

    // const newPosition = lastLesson
    //   ? lastLesson.position + 1
    //   : 1;

    /*
     Now we can finally create our chapter
   */
    // await this.databaseService.video.create({
    //       data: {
    //           title: name,
    //           lessonId: lesson.id,
    //           description: "",
    //           duration: 0,
    //           // ownerId: accountId,
    //           position: newPosition,
    //       },
    //   });
    return lesson;
  }

  async updateChapterReorder(
    courseId: string,
    userId: string,
    list: { id: string; position: number }[],
  ) {
    const courseOwner = await this.databaseService.course.findFirst({
      where: { id: courseId, createdById: userId },
    });

    if (!courseOwner) {
      throw new CourseNotFoundException(courseId);
    }

    // 🔥 ensure videos belong to same lesson (optional but good)
    const videoIds = list.map((i) => i.id);

    const videos = await this.databaseService.video.findMany({
      where: { id: { in: videoIds } },
    });

    if (videos.length !== list.length) {
      throw new VideoBadRequestException('Some videos not found');
    }

    // ⚡ reorder
    await this.databaseService.$transaction(
      list.map((item) =>
        this.databaseService.video.update({
          where: { id: item.id },
          data: { position: item.position },
        }),
      ),
    );

    return { message: 'Success' };
  }
}
