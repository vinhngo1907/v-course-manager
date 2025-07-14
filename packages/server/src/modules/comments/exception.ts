import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';
import { CustomForbiddenException } from 'src/common/exceptions/CustomForbiddenException';
import { CustomNotFoundException } from 'src/common/exceptions/CustomNotFoundException';
import { CustomUnknownException } from 'src/common/exceptions/CustomUnknownException';

export class CommentNotFoundException extends CustomNotFoundException {
  constructor(accountId: string) {
    super(accountId, 'Comment');
  }
}

export class CommentBadRequestException extends CustomBadRequestException {
  constructor(action: string) {
    super(action, 'Comment');
  }
}

export class CommentUnknownException extends CustomUnknownException {
  constructor(action: string, additionalInfo: string) {
    super(action, 'Comment', additionalInfo);
  }
}

export class CommentForbiddenException extends CustomForbiddenException {
  constructor(userId: string, accountId: string, action: string) {
    super(userId, accountId, action, 'Comment');
  }
}
