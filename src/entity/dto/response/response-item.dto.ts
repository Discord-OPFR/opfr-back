import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { CreateItemDto } from '../create/create-item.dto';

export class ResponseItemDto extends CreateItemDto {
  @ApiProperty({ type: String, description: 'MongoDB ObjectId' })
  _id!: Types.ObjectId;
}
