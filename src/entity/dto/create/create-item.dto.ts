import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsIn } from 'class-validator';

import {
  EntityCategory,
  ITEM_IMAGE_IDS,
  type ItemImageId,
  type ItemType,
} from '@opfr/definitions';

import { ITEM_CATEGORY, ITEM_TYPES } from '../../constants';
import { CreateEntityDto } from './create-entity.dto';

export class CreateItemDto extends OmitType(CreateEntityDto, [
  'type',
  'image',
  'category',
] as const) {
  @ApiProperty({ enum: ITEM_TYPES, example: 'object' })
  @IsIn(ITEM_TYPES)
  type!: ItemType;

  @ApiProperty({ enum: ITEM_IMAGE_IDS, example: 'wood' })
  @IsIn(ITEM_IMAGE_IDS)
  image!: ItemImageId;

  @ApiProperty({ enum: ITEM_CATEGORY, example: 'item' })
  @IsIn(ITEM_CATEGORY)
  category!: Exclude<EntityCategory, 'equipment'>;
}
