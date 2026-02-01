import { ApiPropertyOptional } from '@nestjs/swagger';
import { ToArray } from '@shared/decorator';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import {
  ENTITY_CATEGORY,
  ENTITY_TYPES,
  type EntityCategory,
  type EntityType,
  RANKS,
  RankId,
} from '@opfr/definitions';

export class FilterEntityDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ToArray()
  @IsArray()
  @IsEnum(ENTITY_CATEGORY, {
    each: true,
    message: `category must be one of the following values: ${ENTITY_CATEGORY}`,
  })
  category!: EntityCategory[];

  @ApiPropertyOptional()
  @IsOptional()
  @ToArray()
  @IsArray()
  @IsEnum(Object.keys(RANKS), {
    each: true,
    message: `rankId must be one of the following values: ${Object.keys(RANKS)}`,
  })
  rankId!: RankId[];

  @ApiPropertyOptional()
  @IsOptional()
  @ToArray()
  @IsArray()
  @IsEnum(ENTITY_TYPES, {
    each: true,
    message: `type must be one of the following values: ${ENTITY_TYPES}`,
  })
  type!: EntityType[];
}
