import { IsCharacteristicsValid } from '@common/decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import {
  Buff,
  Characteristic,
  Effect,
  type EntityCategory,
  type EntityImageId,
  type EntityType,
  RankId,
  type ShopOptions,
  type UsageOptions
} from '@opfr/definitions';
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

  // @ApiProperty({ type: 'string' })
  @IsString() //Il faudrait une constante avec tous les types possibles dedans pour pouvoir protéger correctement
  type!: EntityType;

  // @ApiProperty({ type: 'string' })
  @IsString()// Same shit
  image!: EntityImageId;

  @ApiProperty({ type: 'string' })
  @IsString()
  emojis!: string;

  @IsString() // même chose que les types
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

  //Faut faire le swagger
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
