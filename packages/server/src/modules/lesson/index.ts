import { Module, Logger } from '@nestjs/common';
import { LessonController } from './controller';
import { LessonService } from './service';
import { DatabaseService } from '@modules/database/service';
import { VideoService } from '@modules/video/service';
import { CourseService } from '@modules/course/service';
import { MuxService } from 'src/config/mux';

@Module({
  providers: [
    LessonService,
    DatabaseService,
    VideoService,
    CourseService,
    Logger,
    MuxService,
  ],
  controllers: [LessonController],
  exports: [LessonService],
})
export class LessonModule {}
