import { Module, Logger } from '@nestjs/common';
import { LessonController } from './controller';
import { LessonService } from './service';
import { DatabaseService } from '@modules/database/service';
import { VideoService } from '@modules/video/service';
import { CourseService } from '@modules/course/service';

@Module({
  providers: [
    LessonService,
    DatabaseService,
    VideoService,
    CourseService,
    Logger,
  ],
  controllers: [LessonController],
  exports: [LessonService],
})
export class LessonModule {}
