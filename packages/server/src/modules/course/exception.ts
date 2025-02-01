import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';
import { CustomForbiddenException } from 'src/common/exceptions/CustomForbiddenException';
import { CustomNotFoundException } from 'src/common/exceptions/CustomNotFoundException';
import { CustomUnknownException } from 'src/common/exceptions/CustomUnknownException';

export class CourseNotFoundException extends CustomNotFoundException {
  constructor(courseId: string) {
    super(courseId, 'Course');
  }
}

export class CourseBadRequestException extends CustomBadRequestException {
  constructor(action: string) {
    super(action, 'Course');
  }
}

export class CourseUnknownException extends CustomUnknownException {
  constructor(action: string, additionalInfo: string) {
    super(action, 'Course', additionalInfo);
  }
}

export class CourseForbiddenException extends CustomForbiddenException {
  constructor(actorId: string, courseId: string, action: string) {
    super(actorId, courseId, action, 'Course');
  }
}
