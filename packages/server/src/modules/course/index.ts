import { Logger, Module } from '@nestjs/common';
import { CourseService } from './service';
import { CourseController } from './controller';
import { DatabaseService } from '@modules/database/service';
import { AuthModule } from '@modules/auth';

@Module({
  providers: [DatabaseService, CourseService, Logger],
  controllers: [CourseController],
  exports: [CourseService]
})
export class CourseModule { }
