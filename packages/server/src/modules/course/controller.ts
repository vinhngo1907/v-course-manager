import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CourseService } from './service';
import { CourseDTO, RegisterCourseDTO } from './dto/course';
import { CourseCreationDTO } from './dto/create-course.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
    @ApiOperation({ summary: 'Create new course' })
    @ApiResponse({ status: 201, description: 'Course is created in successfully' })
    @ApiResponse({ status: 400, description: 'Data input is not correct!' })
    async createCourse(@Body() dto: CourseCreationDTO) {
        return await this.courseService.addCourse(dto);
    }

    @Post("/registration")
    async register(@Body() dto: RegisterCourseDTO) {
        return this.courseService.registerCourse(dto);
    }

    @Get(':id')
    async getUserRegistrations(@Param('id') userId: string) {
        return this.courseService.getUserRegistrations(userId);
    }

    @Delete()
    async unregister(@Body() dto: RegisterCourseDTO) {
        return this.courseService.unregisterCourse(dto);
    }
}
