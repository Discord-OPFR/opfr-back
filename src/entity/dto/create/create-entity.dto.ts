import { IsCharacteristicsValid } from '@common/decorator';
import { ApiCharacteristics } from '@common/decorator/swagger/characteristics.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import {
  Buff,
  Characteristic,
  ENTITY_IMAGE_IDS,
  Effect,
  type EntityCategory,
  type EntityImageId,
  type EntityType,
  RankId,
  type ShopOptions,
  type UsageOptions,
} from '@opfr/definitions';

import { ENTITY_CATEGORY, ENTITY_TYPES } from '../../constants';
import { BottleDTO } from '../bottle.dto';
import { DescriptionDTO } from '../description.dto';
import { EffectDTO } from '../effect.dto';
import { NameDTO } from '../name.dto';
import { ShopDTO } from '../shop.dto';
import { UsageDTO } from '../usage.dto';

export class CreateEntityDto {
  @ApiProperty({ example: 'wood', type: 'string' })
  @IsString()
  entityId!: string;

  @ApiProperty({ type: NameDTO })
  @ValidateNested()
  @Type(() => NameDTO)
  name!: NameDTO;

  @ApiProperty({ type: DescriptionDTO })
  @IsOptional()
  @ValidateNested()
  @Type(() => DescriptionDTO)
  description?: DescriptionDTO;

  @ApiProperty({ enum: ENTITY_TYPES, example: 'object' })
  @IsIn(ENTITY_TYPES)
  type!: EntityType;

  @ApiProperty({ enum: ENTITY_IMAGE_IDS })
  @IsIn(ENTITY_IMAGE_IDS)
  image!: EntityImageId;

  @ApiProperty({
    type: 'string',
    example: '<:bottle_xp_2:1243980696083632208>',
  })
  @IsString()
  emojis!: string;

  @ApiProperty({ enum: ENTITY_CATEGORY, example: 'item' })
  @IsIn(ENTITY_CATEGORY)
  category!: EntityCategory;

  @ApiProperty({ type: EffectDTO })
  @ValidateNested()
  @Type(() => EffectDTO)
  effects!: Effect[];

  @ApiProperty({ enum: RankId, example: 'BASIC' })
  @IsOptional()
  @IsEnum(RankId)
  rankId?: RankId;

  @ApiProperty({ type: UsageDTO })
  @IsOptional()
  @Type(() => UsageDTO)
  usage?: UsageOptions;

  @ApiProperty({ type: ShopDTO })
  @IsOptional()
  @Type(() => ShopDTO)
  shop?: ShopOptions;

  @ApiProperty({ type: BottleDTO })
  @IsOptional()
  @Type(() => BottleDTO)
  bottle?: {
    xp: [number, number] | number;
    buffs: Buff[];
    hp?: number;
    tier: 1 | 2 | 3 | 4;
  };

  @ApiProperty({ type: 'number' })
  @IsOptional()
  @IsNumber()
  ms?: number;

  @ApiCharacteristics()
  @IsOptional()
  @IsCharacteristicsValid()
  characteristics?: Partial<Record<Characteristic, [number, number] | number>>;

  @ApiProperty({ type: 'number', example: 30 })
  @IsNumber()
  @IsOptional()
  level?: number;

  @ApiProperty({ type: 'string', example: 'adventurer' })
  @IsString()
  @IsOptional()
  panoply?: string;
}
