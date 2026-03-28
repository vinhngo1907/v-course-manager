import { Module } from '@nestjs/common';
import { LessonController } from './controller';
import { LessonService } from './service';
import { DatabaseService } from '@modules/database/service';

@Module({
  providers: [LessonService, DatabaseService],
  controllers: [LessonController],
})
export class LessonModule {}
