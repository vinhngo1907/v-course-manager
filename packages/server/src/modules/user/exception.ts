import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';
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
