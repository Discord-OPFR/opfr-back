import { HttpStatus } from '@nestjs/common';
import { BaseError } from '@shared/errors/BaseError';

export class ItemNotFoundException extends BaseError {
  constructor(id: string) {
    super(HttpStatus.NOT_FOUND, `Item ${id} not found`, 'ITEM_NOT_FOUND');
  }
}
