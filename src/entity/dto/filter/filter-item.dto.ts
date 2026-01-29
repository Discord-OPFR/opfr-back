import { IsEnum, IsOptional, IsString } from 'class-validator';

import {
  ITEM_CATEGORY,
  ITEM_TYPE,
  type ItemCategory,
  type ItemType,
  RANKS,
  type RankId,
} from '@opfr/definitions';

export class FilterItemDto {
  @IsOptional()
  @IsString()
  entityId!: string;

  @IsOptional()
  @IsEnum(ITEM_CATEGORY, {
    message: `category must be one of the following values: ${ITEM_CATEGORY}`,
  })
  category!: ItemCategory;

  @IsOptional()
  @IsEnum(RANKS, {
    message: `category must be one of the following values: ${RANKS}`,
  })
  rankId!: RankId;

  @IsOptional()
  @IsEnum(ITEM_TYPE, {
    message: `category must be one of the following values: ${ITEM_TYPE}`,
  })
  type!: ItemType;
}
