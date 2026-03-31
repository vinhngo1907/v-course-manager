import { DatabaseService } from '@modules/database/service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LessonUpdateStatusDto } from './dto/lesson';
import { CourseNotFoundException } from '@modules/course/exception';

@Injectable()
export class LessonService {
  constructor(private readonly databaseService: DatabaseService) {}
  async updateStatus({
    lessonId,
    accountId,
    published,
  }: LessonUpdateStatusDto) {
    if (!accountId)
      throw new ForbiddenException(
        "You don't have permission to update not own lesson",
      );

    const existedCourse = await this.databaseService.course.findFirst({
      where: {
        createdById: accountId,
      },
    });
    if (!existedCourse)
      throw new CourseNotFoundException(
        'Course does not exist with user ' + accountId,
      );

    const existedLesson = await this.databaseService.lesson.findFirst({
      where: { id: lessonId, courseId: existedCourse.id },
    });

    if (!existedLesson)
      throw new NotFoundException(`This lesson ${lessonId} not found`);

    return await this.databaseService.lesson.update({
      where: { id: existedLesson.id },
      data: {
        published: published,
      },
    });
  }
}
