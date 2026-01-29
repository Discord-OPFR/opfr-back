import { IsEnum, IsOptional, IsString } from 'class-validator';

import {
  ENTITY_CATEGORY,
  ENTITY_TYPES,
  type EntityCategory,
  type EntityType,
  RANKS,
  RankId,
} from '@opfr/definitions';

export class FilterEntityDto {
  @IsOptional()
  @IsString()
  entityId!: string;

  @IsOptional()
  @IsEnum(ENTITY_CATEGORY, {
    message: `category must be one of the following values: ${ENTITY_CATEGORY}`,
  })
  category!: EntityCategory;

  @IsOptional()
  @IsEnum(RANKS, {
    message: `category must be one of the following values: ${RANKS}`,
  })
  rankId!: RankId;

  @IsOptional()
  @IsEnum(ENTITY_TYPES, {
    message: `category must be one of the following values: ${ENTITY_TYPES}`,
  })
  type!: EntityType;
}
