import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { CreateEntityDto } from '../create/create-entity.dto';

export class ResponseEntityDto extends CreateEntityDto {
  @ApiProperty({ type: String, description: 'MongoDB ObjectId' })
  _id!: Types.ObjectId;
}
