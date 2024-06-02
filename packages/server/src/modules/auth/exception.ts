import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';
import { CustomForbiddenException } from 'src/common/exceptions/CustomForbiddenException';
import { CustomNotFoundException } from 'src/common/exceptions/CustomNotFoundException';
import { CustomUnknownException } from 'src/common/exceptions/CustomUnknownException';

export class AuthNotFoundException extends CustomNotFoundException {
	constructor(accountId: string) {
		super(accountId, 'Auth');
	}
}

export class AuthBadRequestException extends CustomBadRequestException {
	constructor(action: string) {
		super(action, 'Auth');
	}
}

export class AuthUnknownException extends CustomUnknownException {
	constructor(action: string, additionalInfo: string) {
		super(action, 'Auth', additionalInfo);
	}
}

export class AuthForbiddenException extends CustomForbiddenException {
	constructor(userId: string, accountId: string, action: string) {
		super(userId, accountId, action, 'Auth');
	}
}

// export class AutUnauthorizedException extends CustomForbiddenException {
// 	constructor(userId: string, accountId: string, action: string) {
// 		super(userId, accountId, action, 'Auth');
// 	}
// }
