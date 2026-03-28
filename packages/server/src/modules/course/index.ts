import { Logger, Module } from '@nestjs/common';
import { CourseService } from './service';
import { CourseController } from './controller';
import { DatabaseService } from '@modules/database/service';
import { MinioService } from 'src/config/minio';

@Module({
  providers: [DatabaseService, CourseService, Logger, MinioService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
