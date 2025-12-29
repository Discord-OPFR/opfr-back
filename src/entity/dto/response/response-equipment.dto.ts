import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { CreateEquipmentDto } from '../create/create-equipment.dto';

export class ResponseEquipmentDTO extends CreateEquipmentDto {
  @ApiProperty({ type: String, description: 'MongoDB ObjectId' })
  _id!: Types.ObjectId;
}
