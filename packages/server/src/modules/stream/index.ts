import { Global, Logger, Module } from '@nestjs/common';
import { DatabaseService } from '@modules/database/service';
import { StreamController } from './controller';
import { StreamService } from './service';
import { VideoService } from '@modules/video/service';
import { CourseService } from '../course/service';
import { LivekitService } from 'src/config/livekit';
import { LivekitWebhookController } from './controllers/stream-webhook';

@Global()
@Module({
  providers: [
    DatabaseService,
    Logger,
    StreamService,
    VideoService,
    CourseService,
    LivekitService,
  ],
  controllers: [StreamController, LivekitWebhookController],
})
export class StreamModule {}
