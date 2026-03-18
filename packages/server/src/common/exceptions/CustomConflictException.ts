import { ConflictException } from '@nestjs/common';

export class CustomConflictException extends ConflictException {
  constructor(domain: string, reason: string, field?: string) {
    super({
      statusCode: 409,
      error: 'Conflict',
      domain,
      reason,
      field,
    });
  }
}
