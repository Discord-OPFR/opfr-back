import { HttpStatus } from '@nestjs/common';
import { BaseError } from '@shared/errors/BaseError';

export class EquipmentNotFoundException extends BaseError {
  constructor(id: string) {
    super(
      HttpStatus.NOT_FOUND,
      `Equipment ${id} not found`,
      'EQUIPMENT_NOT_FOUND',
    );
  }
}
