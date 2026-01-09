import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsIn } from 'class-validator';

import {
  EntityCategory,
  ITEM_CATEGORY,
  ITEM_IMAGE_IDS,
  ITEM_TYPE,
  type ItemImageId,
  type ItemType,
} from '@opfr/definitions';

import { CreateEntityDto } from './create-entity.dto';

export class CreateItemDto extends OmitType(CreateEntityDto, [
  'type',
  'image',
  'category',
] as const) {
  @ApiProperty({ enum: ITEM_TYPE, example: 'object' })
  @IsIn(ITEM_TYPE)
  type!: ItemType;

  @ApiProperty({ enum: ITEM_IMAGE_IDS, example: 'wood' })
  @IsIn(ITEM_IMAGE_IDS)
  image!: ItemImageId;

  @ApiProperty({ enum: ITEM_CATEGORY, example: 'item' })
  @IsIn(ITEM_CATEGORY)
  category!: Exclude<EntityCategory, 'equipment'>;
}
