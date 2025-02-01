import { Controller, Get } from '@nestjs/common';
import { CourseService } from './service';
import { CourseDTO } from './dto/course';

@Controller('course')
export class CourseController {
    constructor(
        public readonly courseService: CourseService
    ) { }
    @Get()
    async getAll(): Promise<CourseDTO[]> {
        return await this.courseService.findAll();
    }
}
