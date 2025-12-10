import { Global, Logger, Module } from '@nestjs/common';
import { DatabaseService } from '@modules/database/service';
import { StreamController } from './controller';
import { StreamService } from './service';
import { VideoService } from '@modules/video/service';
import { CourseService } from '../course/service';

@Global()
@Module({
  providers: [
    DatabaseService,
    Logger,
    StreamService,
    VideoService,
    CourseService,
  ],
  controllers: [StreamController],
})
export class StreamModule {}
