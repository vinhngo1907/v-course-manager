import { Module } from '@nestjs/common';
import { SubtitlesController } from './controller';
import { SubtitlesService } from './service';
import { DatabaseService } from '@modules/database/service';

@Module({
  controllers: [SubtitlesController],
  providers: [SubtitlesService, DatabaseService]
})
export class SubtitlesModule { }
