import { Logger, Module } from '@nestjs/common';
import { VideoController } from './controller';
import { VideoService } from './service';
import { DatabaseService } from '@modules/database/service';

@Module({
    controllers: [VideoController],
    providers: [VideoService, DatabaseService, Logger],
    exports: [VideoService]
})
export class VideoModule { }
