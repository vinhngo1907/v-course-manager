import { DatabaseService } from '@modules/database/service';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CourseDTO } from './dto/course';

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
}
