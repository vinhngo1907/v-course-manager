import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';
import { CustomForbiddenException } from 'src/common/exceptions/CustomForbiddenException';
import { CustomNotFoundException } from 'src/common/exceptions/CustomNotFoundException';
import { CustomUnknownException } from 'src/common/exceptions/CustomUnknownException';

export class RoleNotFoundException extends CustomNotFoundException {
  constructor(bookId: string) {
    super(bookId, 'Role');
  }
}

export class RoleBadRequestException extends CustomBadRequestException {
  constructor(action: string) {
    super(action, 'Role');
  }
}

export class RoleUnknownException extends CustomUnknownException {
  constructor(action: string, additionalInfo: string) {
    super(action, 'Role', additionalInfo);
  }
}

export class RoleForbiddenException extends CustomForbiddenException {
  constructor(actorId: string, bookId: string, action: string) {
    super(actorId, bookId, action, 'Role');
  }
}
