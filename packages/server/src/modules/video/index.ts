import { Module } from '@nestjs/common';
import { VideoController } from './controller';
import { VideoService } from './service';
import { DatabaseService } from '@modules/database/service';

@Module({
    controllers: [VideoController],
    providers: [VideoService, DatabaseService]
})
export class VideoModule { }
