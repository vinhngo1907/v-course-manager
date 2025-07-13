import { DatabaseService } from '@modules/database/service';
import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CourseByUser, CourseDTO, CourseWithLessonsDTO, RegisterCourseDTO } from './dto/course';
import { CourseCreationDTO } from "./dto/create-course.dto";
import { CrudRequest } from '@nestjsx/crud';
import { CourseUpdateDTO } from './dto/update-course';
import { CourseNotFoundException } from './exception';

@Injectable()
export class CourseService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: Logger,
    ) { }

    async findAll(req: CrudRequest): Promise<{
        data: CourseWithLessonsDTO[],
        total: number,
        page: number,
        pageCount: number,
        limit: number
    }> {
        try {
            const page = req.parsed.page || 1;
            const limit = req.parsed.limit || 20;
            const authorFilter = req.parsed.filter?.find(
                (f) => f.field === 'authorId'
            );
            const authorId = authorFilter?.value;
            const where = authorId ? { createdById: authorId } : {};
            // const [data, total] = await this.getManyAndCountCourses(req);
            const courses = await this.databaseService.course.findMany({
                where,
                include: {
                    lessons: {
                        include: {
                            video: true
                        }
                    }
                }
            });
            const mappedCourses = courses.map(course => ({
                ...course,
                thumbnailUrl: course.thumbnail,
            }));

            return {
                data: mappedCourses,
                page,
                limit,
                total: courses.length,
                pageCount: Math.ceil(courses.length / limit),
            };
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }
    async listCourse() {
        const courses = await this.databaseService.course.findMany({});
        const mappedCourses = courses.map(course => ({
            ...course,
            thumbnailUrl: course.thumbnail,
        }));

        return { data: mappedCourses }
    }
    async registerCourse(dto: RegisterCourseDTO) {
        return await this.databaseService.courseRegistration.create({
            data: {
                userId: dto.userId,
                courseId: dto.courseId,
            }
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
            include: { lessons: { include: { video: true } } },
        });

        if (!course) throw new CourseNotFoundException('Not found');

        let completedLessons: string[] = [];

        if (userId) {
            const progress = await this.databaseService.userLessonProgress.findMany({
                where: {
                    userId: userId,
                    lessonId: { in: course.lessons.map(l => l.id) },
                },
                select: { lessonId: true },
            });
            completedLessons = progress.map(p => p.lessonId);
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
            console.log({ courseId })
            return await this.databaseService.course.delete({
                where: {
                    id: `${courseId}`
                }
            })
        } catch (e) {
            console.error('[DELETE COURSE ERROR]', e);
            throw new InternalServerErrorException(e.message);
        }
    }

    async addCourse(dto: CourseCreationDTO, userId: string): Promise<CourseCreationDTO> {
        try {
            const newCourse = await this.databaseService.course.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    thumbnail: dto.thumbnailUrl,
                    createdById: userId,
                }
            });

            return {
                ...newCourse,
                authorId: newCourse.createdById
            };
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async updateCourse(dto: CourseUpdateDTO, id: string, userId: string): Promise<any> {
        const { description, thumbnail, title } = dto;

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
            },
        });

        return updatedCourse;
    }


    async findOne(courseId: string) {
        return await this.databaseService.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                lessons: true
            }
        })
    }
    async findCourseByUser(dto: CourseByUser) {
        console.log({ dto })
        const course = await this.databaseService.course.findFirst({
            where: {
                id: dto.courseId,
                createdById: dto.userId
            },
            include: {
                lessons: {
                    include: {
                        video: true
                    }
                }
            }
        });

        return course;
    }
}
