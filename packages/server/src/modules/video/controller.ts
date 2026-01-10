import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VideoService } from './service';
import { LessonDTO, VideoDTO } from './dto/video';
import { VideoCreationDTO } from './dto/create-video.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt';
import RequestWithAccount from '@modules/auth/interfaces/RequestWithAccount';
import { ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/common/decorator/swagger-response.decorator';
import { CourseResponseDto } from '@modules/course/dto/course-response.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/:id')
  async getVideosByCourse(@Param('id') id: string): Promise<VideoDTO[]> {
    return await this.videoService.findVideosByCourse(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/lesson/:lessonId')
  async getVideoByLesson(
    @Param('lessonId') lessonId: string,
  ): Promise<LessonDTO> {
    return await this.videoService.findOneWithVideo(lessonId);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.videoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Complete creating video',
    description:
      'Completes the creating video process for the authenticated user by saving their profile information, goals, and preferences.',
  })
  @ApiSuccessResponse(CourseResponseDto, {
    status: 201,
    description: 'Creating video completed successfully',
  })
  @ApiErrorResponse({
    status: 400,
    description: 'Invalid request data - validation errors or invalid',
  })
  @ApiErrorResponse({
    status: 401,
    description: 'Unauthorized - valid authentication token required',
  })
  @ApiErrorResponse({
    status: 409,
    description: 'Conflict - creating already completed',
  })
  @ApiErrorResponse({
    status: 500,
    description: 'Internal server error during creating video',
  })
  async create(
    @Body() createVideoDTO: VideoCreationDTO,
    @Req() req: RequestWithAccount,
  ): Promise<VideoCreationDTO> {
    const account = req.user;

    // if (!account || !account.userId) {
    //     throw new BadRequestException('Account not found or not authenticated.');
    // }
    // console.log({ account })
    return await this.videoService.create(createVideoDTO, account.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/lesson/:lessonId/progress')
  async markLessonCompleted(
    @Param('lessonId') lessonId: string,
    @Req() req: RequestWithAccount,
  ) {
    const userId = req.user.id;
    return await this.videoService.createProgress(lessonId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/lesson/:lessonId/progress')
  async unmarkLessonCompleted(
    @Param('lessonId') lessonId: string,
    @Req() req: RequestWithAccount,
  ) {
    const userId = req.user.id;
    return await this.videoService.removeProgress(lessonId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<VideoDTO[]> {
    return await this.videoService.findAll();
  }
}
