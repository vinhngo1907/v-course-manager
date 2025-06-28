import { DatabaseService } from '@modules/database/service';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CourseDTO, RegisterCourseDTO } from './dto/course';
import { CourseCreationDTO } from "./dto/create-course.dto";
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class CourseService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: Logger,
    ) { }

    async findAll(req: CrudRequest): Promise<{
        data: CourseDTO[],
        total: number,
        page: number,
        pageCount: number,
        limit: number
    }> {
        try {
            const page = req.parsed.page || 1;
            const limit = req.parsed.limit || 20;

            // const [data, total] = await this.getManyAndCountCourses(req);
            const courses = await this.databaseService.course.findMany();
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

            return newCourse;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(courseId: string) {
        return await this.databaseService.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                videos: true
            }
        })
    }
}
