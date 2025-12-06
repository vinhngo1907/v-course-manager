import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Res,
  Req,
  BadRequestException,
  Injectable,
  Put,
  Patch,
  Query,
} from '@nestjs/common';
import { CourseService } from './service';
import { Request, Response } from 'express';
import { CourseDTO, RegisterCourseDTO } from './dto/course';
import { CourseCreationDTO } from './dto/create-course.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudRequest,
  CrudRequestInterceptor,
  ParsedRequest,
} from '@nestjsx/crud';
import { CourseEntity } from './model';
import { JwtAuthGuard } from '@modules/auth/guards/jwt';
import RequestWithAccount from '@modules/auth/interfaces/RequestWithAccount';
import { JwtStrategy } from '@modules/auth/strategies/jwt';
import { CourseUpdateDTO } from './dto/update-course';
import { OptionalJwtAuthGuard } from '@modules/auth/guards/OptionalJwtAuthGuard';
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
  constructor(public readonly courseService: CourseService) {}
  // @UseGuards(JwtAuthGuard)
  @Get()
  @UseInterceptors(CrudRequestInterceptor)
  async getAll(
    @ParsedRequest() req: CrudRequest,
    @Query('authorId') authorId?: string,
  ): Promise<any> {
    return await this.courseService.findAll(req, authorId);
  }

  @Get('/list')
  async findAll(@ParsedRequest() req: CrudRequest): Promise<any> {
    return await this.courseService.listCourse();
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create new course' })
  @ApiResponse({
    status: 201,
    description: 'Course is created in successfully',
  })
  @ApiResponse({ status: 400, description: 'Data input is not correct!' })
  async createCourse(
    @Body() dto: CourseCreationDTO,
    @Req() req: RequestWithAccount,
  ) {
    // const account = req.user;
    // console.log({dto, account });
    // if (!account || !account.userId) {
    //     throw new BadRequestException('Account not found or not authenticated.');
    // }
    return await this.courseService.addCourse(dto, dto.authorId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({
    status: 201,
    description: 'Course is updated in successfully',
  })
  @ApiResponse({ status: 400, description: 'Data input is not correct!' })
  async updateCourse(
    @Param('id') id: string,
    @Body() dto: CourseUpdateDTO,
    @Req() req: RequestWithAccount,
  ) {
    const userId = req.user.id;
    console.log('Hello world');
    return await this.courseService.updateCourse(dto, id, userId);
  }

  @Post('/registration')
  async register(@Body() dto: RegisterCourseDTO) {
    return this.courseService.registerCourse(dto);
  }

  @Get('/registration/:id')
  async getUserRegistrations(@Param('id') userId: string) {
    console.log({ userId });
    return this.courseService.getUserRegistrations(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCourse(
    @Param('id') courseId: string,
    @Req() req: RequestWithAccount,
  ) {
    const account = req.user;
    // console.log({account})
    return await this.courseService.getCourseById(courseId, account.id);
  }

  @Post()
  async unregister(@Body() dto: RegisterCourseDTO) {
    return this.courseService.unregisterCourse(dto);
  }

  @Delete(':id')
  async removeCourseById(@Param() id: string) {
    console.log({ id });
    return await this.courseService.deleteCourse(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  async getCourseByUser(
    @Param('id') id: string,
    @Req() req: RequestWithAccount,
    @Res() res: Response,
  ) {
    const account = req.user;
    // console.log({ account })
    const course = await this.courseService.findCourseByUser({
      courseId: id,
      userId: account.id,
    });
    return res.send(course);
  }
}
