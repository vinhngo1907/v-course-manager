import { DatabaseService } from '@modules/database/service';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CourseDTO, RegisterCourseDTO } from './dto/course';

@Injectable()
export class CourseService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: Logger,
    ) { }

    async findAll(): Promise<CourseDTO[]> {
        try {
            const courses = await this.databaseService.course.findMany({});
            return courses;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
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
}
