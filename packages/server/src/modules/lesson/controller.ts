import { JwtAuthGuard } from '@modules/auth/guards/jwt';
import RequestWithAccount from '@modules/auth/interfaces/RequestWithAccount';
import { VideoService } from '@modules/video/service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LessonService } from './service';
import { LessonDTO, LessonResponseDTO, LessonUpdateDTO } from './dto/lesson';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from 'src/common/decorator/swagger-response.decorator';

@ApiTags('Lessons')
@Controller({
  path: 'lessons',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LessonController {
  constructor(
    // private readonly courseService: CourseService,
    private readonly videoService: VideoService,
    private readonly lessonService: LessonService,
  ) {}

  @Patch(':id/status')
  async updateStatus(
    @Param('id') lessonId: string,
    @Req() req: RequestWithAccount,
    @Body('published') isPublished: boolean,
  ) {
    const account = req.user.id;
    return await this.lessonService.updateStatus({
      lessonId,
      accountId: account,
      published: isPublished,
    });
  }

  @Put(':lessonId')
  @ApiOperation({
    summary: 'Complete updating lesson',
    description:
      'Completes the creating video process for the authenticated user by saving their profile information, goals, and preferences.',
  })
  @ApiSuccessResponse(LessonResponseDTO, {
    status: 200,
    description: 'Creating video to complete updating lesson successfully',
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
    status: 404,
    description: 'Lesson does not exist',
  })
  @ApiErrorResponse({
    status: 500,
    description: 'Internal server error during updating lesson',
  })
  async updateLesson(
    @Param('lessonId') lessonId: string,
    @Body() data: LessonUpdateDTO,
    @Req() req: RequestWithAccount,
  ): Promise<LessonDTO> {
    const userId = req.user.id;
    return await this.lessonService.updateLesson({ lessonId, ...data }, userId);
  }

  @Put(':courseId/chapters/reorder')
  @ApiOperation({
    summary: 'Reorder lessons in a course',
    description:
      'Reorders the lessons within a specific course for the authenticated user. The order is determined by the provided list of lesson IDs and positions.',
  })
  @ApiParam({
    name: 'courseId',
    required: true,
    description: 'The ID of the course containing the lessons',
  })
  @ApiBody({
    schema: {
      example: {
        list: [
          { id: 'lesson-id-1', position: 0 },
          { id: 'lesson-id-2', position: 1 },
        ],
      },
    },
  })
  @ApiSuccessResponse(null, {
    status: 200,
    description: 'Lessons reordered successfully',
  })
  @ApiErrorResponse({
    status: 400,
    description: 'Invalid request data or malformed list',
  })
  @ApiErrorResponse({
    status: 401,
    description: 'Unauthorized - valid authentication token required',
  })
  @ApiErrorResponse({
    status: 404,
    description: 'Course does not exist or user is not the owner',
  })
  @ApiErrorResponse({
    status: 500,
    description: 'Internal server error during lesson reordering',
  })
  async reorderLessons(
    @Param('courseId') courseId: string,
    @Req() req: RequestWithAccount,
    @Body() body: { list: { id: string; position: number }[] },
  ) {
    return this.lessonService.reorderLessons(courseId, req.user.id, body.list);
  }

  @Put(':lessonId/videos/reorder')
  @ApiOperation({
    summary: 'Reorder videos (chapters) in a lesson',
    description:
      'Reorders the videos (chapters) within a specific lesson. Ensures all videos belong to the same lesson and are owned by the authenticated user.',
  })
  @ApiParam({
    name: 'lessonId',
    required: true,
    description: 'The ID of the lesson containing the videos',
  })
  @ApiBody({
    schema: {
      example: {
        list: [
          { id: 'video-id-1', position: 0 },
          { id: 'video-id-2', position: 1 },
        ],
      },
    },
  })
  @ApiSuccessResponse(null, {
    status: 200,
    description: 'Videos reordered successfully',
  })
  @ApiErrorResponse({
    status: 400,
    description: 'Invalid request data or videos not in the same lesson',
  })
  @ApiErrorResponse({
    status: 401,
    description: 'Unauthorized - valid authentication token required',
  })
  @ApiErrorResponse({
    status: 404,
    description: 'Lesson does not exist or user is not the owner',
  })
  @ApiErrorResponse({
    status: 500,
    description: 'Internal server error during video reordering',
  })
  async reorderVideos(
    @Param('lessonId') lessonId: string,
    @Req() req: RequestWithAccount,
    @Body() body: { list: { id: string; position: number }[] },
  ) {
    return this.lessonService.reorderVideos(lessonId, req.user.id, body.list);
  }

  @Get(':lessonId/chapters')
  @ApiOperation({
    summary: 'Get videos (chapters) of a lesson',
    description:
      'Retrieves all videos (chapters) associated with a specific lesson for the authenticated user. Includes video metadata such as MUX playback information and status.',
  })
  @ApiParam({
    name: 'lessonId',
    required: true,
    description: 'The ID of the lesson to retrieve videos from',
  })
  @ApiSuccessResponse(LessonResponseDTO, {
    status: 200,
    description: 'Videos retrieved successfully',
  })
  @ApiErrorResponse({
    status: 400,
    description: 'Invalid lesson ID format',
  })
  @ApiErrorResponse({
    status: 401,
    description: 'Unauthorized - valid authentication token required',
  })
  @ApiErrorResponse({
    status: 404,
    description: 'Lesson does not exist or user is not the owner',
  })
  @ApiErrorResponse({
    status: 500,
    description: 'Internal server error while retrieving videos',
  })
  async getChapter(
    @Param('lessonId') lessonId: string,
    @Req() req: RequestWithAccount,
  ): Promise<LessonDTO> {
    const userId = req.user.id;
    return await this.videoService.getChapterByLesson(lessonId, userId);
  }
}
