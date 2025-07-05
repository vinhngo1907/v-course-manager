import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UseGuards, Res, Req, BadRequestException, Injectable } from '@nestjs/common';
import { CourseService } from './service';
import { Request } from 'express';
import { CourseDTO, RegisterCourseDTO } from './dto/course';
import { CourseCreationDTO } from './dto/create-course.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { CourseEntity } from './model';
import { JwtAuthGuard } from '@modules/auth/guards/jwt';
import RequestWithAccount from '@modules/auth/interfaces/RequestWithAccount';
import { JwtStrategy } from '@modules/auth/strategies/jwt';
@Injectable()
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
    // @UseGuards(JwtAuthGuard)
    @Get()
    @UseInterceptors(CrudRequestInterceptor)
    async getAll(@ParsedRequest() req: CrudRequest): Promise<any> {
        return await this.courseService.findAll(req);
    }

    @Get("/list")
    async findAll(@ParsedRequest() req: CrudRequest): Promise<any> {
        return await this.courseService.listCourse();
    }

    // @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create new course' })
    @ApiResponse({ status: 201, description: 'Course is created in successfully' })
    @ApiResponse({ status: 400, description: 'Data input is not correct!' })
    async createCourse(
        @Body() dto: CourseCreationDTO,
        @Req() req: RequestWithAccount) {
        // const account = req.user;
        // console.log({dto, account });
        // if (!account || !account.userId) {
        //     throw new BadRequestException('Account not found or not authenticated.');
        // }
        return await this.courseService.addCourse(dto, dto.authorId);
    }

    @Post("/registration")
    async register(@Body() dto: RegisterCourseDTO) {
        return this.courseService.registerCourse(dto);
    }

    @Get(':id')
    async getUserRegistrations(@Param('id') userId: string) {
        return this.courseService.getUserRegistrations(userId);
    }

    @Post()
    async unregister(@Body() dto: RegisterCourseDTO) {
        return this.courseService.unregisterCourse(dto);
    }

    @Delete(":id")
    async removeCourseById(@Param() id: string) {
        console.log({ id })
        return await this.courseService.deleteCourse(id);
    }
}
