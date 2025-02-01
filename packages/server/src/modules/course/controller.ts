import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CourseService } from './service';
import { CourseDTO, RegisterCourseDTO } from './dto/course';

@Controller('course')
export class CourseController {
    constructor(
        public readonly courseService: CourseService
    ) { }
    @Get()
    async getAll(): Promise<CourseDTO[]> {
        return await this.courseService.findAll();
    }

    @Post()
    async register(@Body() dto: RegisterCourseDTO) {
        return this.courseService.registerCourse(dto);
    }

    @Get(':userId')
    async getUserRegistrations(@Param('userId') userId: string) {
        return this.courseService.getUserRegistrations(userId);
    }

    @Delete()
    async unregister(@Body() dto: RegisterCourseDTO) {
        return this.courseService.unregisterCourse(dto);
    }
}
