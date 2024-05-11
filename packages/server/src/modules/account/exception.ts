import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';
import { CustomForbiddenException } from 'src/common/exceptions/CustomForbiddenException';
import { CustomNotFoundException } from 'src/common/exceptions/CustomNotFoundException';
import { CustomUnknownException } from 'src/common/exceptions/CustomUnknownException';

export class AccountNotFoundException extends CustomNotFoundException {
  constructor(accountId: string) {
    super(accountId, 'Account');
  }
}

export class AccountBadRequestException extends CustomBadRequestException {
  constructor(action: string) {
    super(action, 'Account');
  }
}

export class AccountUnknownException extends CustomUnknownException {
  constructor(action: string, additionalInfo: string) {
    super(action, 'Account', additionalInfo);
  }
}

export class AccountForbiddenException extends CustomForbiddenException {
  constructor(userId: string, accountId: string, action: string) {
    super(userId, accountId, action, 'Account');
  }
}
