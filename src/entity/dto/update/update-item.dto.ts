import { PartialType } from '@nestjs/swagger';

import { CreateItemDto } from '../create/create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {}
