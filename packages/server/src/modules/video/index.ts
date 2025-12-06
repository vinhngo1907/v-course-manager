import { Logger, Module } from '@nestjs/common';
import { VideoController } from './controller';
import { VideoService } from './service';
import { DatabaseService } from '@modules/database/service';
import { CourseService } from '@modules/course/service';

@Module({
  providers: [VideoService, DatabaseService, Logger, CourseService],
  controllers: [VideoController],
  exports: [VideoService],
})
export class VideoModule {}
