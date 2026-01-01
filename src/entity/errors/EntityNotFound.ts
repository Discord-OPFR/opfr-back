import { HttpStatus } from '@nestjs/common';
import { BaseError } from '@shared/errors/BaseError';

export class EntityNotFoundException extends BaseError {
  constructor(id: string) {
    super(HttpStatus.NOT_FOUND, `Entity ${id} not found`, 'ENTITY_NOT_FOUND');
  }
}
