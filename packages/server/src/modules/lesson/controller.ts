import { JwtAuthGuard } from '@modules/auth/guards/jwt';
import RequestWithAccount from '@modules/auth/interfaces/RequestWithAccount';
import { CourseService } from '@modules/course/service';
import { VideoService } from '@modules/video/service';
import { Body, Controller, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LessonService } from './service';

@ApiTags('Lessons')
@Controller({
  path: 'lessons',
  version: '1'
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LessonController {
  constructor(
    private readonly courseService: CourseService,
    private readonly videoService: VideoService,
    private readonly lessonService: LessonService
  ) { }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') lessonId: string,
    @Req() req: RequestWithAccount,
    @Body('published') isPublished: boolean
  ){
    const account = req.user.id;
    return await this.lessonService.updateStatus({lessonId, accountId: account, published: isPublished})
  }
}
