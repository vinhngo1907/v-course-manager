import { UserConflictReason } from 'src/common/enums/user-conflict-type';
import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';
import { CustomConflictException } from 'src/common/exceptions/CustomConflictException';
import { CustomForbiddenException } from 'src/common/exceptions/CustomForbiddenException';
import { CustomNotFoundException } from 'src/common/exceptions/CustomNotFoundException';
import { CustomUnknownException } from 'src/common/exceptions/CustomUnknownException';

export class UserNotFoundException extends CustomNotFoundException {
  constructor(accountId: string) {
    super(accountId, 'User');
  }
}

export class UserBadRequestException extends CustomBadRequestException {
  constructor(action: string) {
    super(action, 'User');
  }
}

export class UserConflictException extends CustomConflictException {
  constructor(message: string, field?: 'email' | 'username') {
    super('User', message, field);
  }
}

export class UserUnknownException extends CustomUnknownException {
  constructor(action: string, additionalInfo: string) {
    super(action, 'User', additionalInfo);
  }
}

export class UserForbiddenException extends CustomForbiddenException {
  constructor(userId: string, accountId: string, action: string) {
    super(userId, accountId, action, 'User');
  }
}
