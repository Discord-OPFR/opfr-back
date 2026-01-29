import { IsEnum, IsOptional, IsString } from 'class-validator';

import {
  EQUIPMENT_CATEGORY,
  EQUIPMENT_TYPE,
  type EquipmentCategory,
  type EquipmentType,
  RANKS,
  RankId,
} from '@opfr/definitions';

export class FilterEquipmentDto {
  @IsOptional()
  @IsString()
  entityId!: string;

  @IsOptional()
  @IsEnum(EQUIPMENT_CATEGORY, {
    message: `category must be one of the following values: ${EQUIPMENT_CATEGORY}`,
  })
  category!: EquipmentCategory;

  @IsOptional()
  @IsEnum(RANKS, {
    message: `category must be one of the following values: ${RANKS}`,
  })
  rankId!: RankId;

  @IsOptional()
  @IsEnum(EQUIPMENT_TYPE, {
    message: `category must be one of the following values: ${EQUIPMENT_TYPE}`,
  })
  type!: EquipmentType;
}
