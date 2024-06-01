import { Module } from '@nestjs/common';
import { CourseService } from './service';
import { CourseController } from './controller';

@Module({
  providers: [CourseService],
  controllers: [CourseController]
})
export class CourseModule { }
