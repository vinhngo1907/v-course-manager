import { Controller, Get, Post, Body, Param, Delete, UseInterceptors } from '@nestjs/common';
import { CourseService } from './service';
import { CourseDTO, RegisterCourseDTO } from './dto/course';
import { CourseCreationDTO } from './dto/create-course.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { CourseEntity } from './model';

@ApiTags('Courses')
@Crud({
    model: {
        type: CourseEntity,
    },
    dto: {
        create: CourseCreationDTO,
    },
    params: {
        id: {
            type: 'uuid',
            primary: true,
            field: 'id',
        },
    },
    query: {
        join: {
            videos: {
                allow: ['id'],
                eager: false,
            },
        },
    },
})
@Controller('courses')
export class CourseController {
    constructor(
        public readonly courseService: CourseService
    ) { }
    @Get()
    @UseInterceptors(CrudRequestInterceptor)
    async getAll(@ParsedRequest() req: CrudRequest): Promise<any> {
        return await this.courseService.findAll(req);
    }

    @Get("/list")
    async findAll(@ParsedRequest() req: CrudRequest): Promise<any> {
        return await this.courseService.listCourse();
    }

    @Post()
    @ApiOperation({ summary: 'Create new course' })
    @ApiResponse({ status: 201, description: 'Course is created in successfully' })
    @ApiResponse({ status: 400, description: 'Data input is not correct!' })
    async createCourse(@Body() dto: CourseCreationDTO) {
        console.log({dto})
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
