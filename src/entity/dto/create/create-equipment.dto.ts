import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsCharacteristicsValid } from '@shared/decorator';
import { DocCharacteristics } from '@shared/decorator';
import { Equals, IsIn, IsNumber, IsString } from 'class-validator';

import {
  Characteristic,
  EQUIPMENT_IMAGE_IDS,
  EQUIPMENT_TYPE,
  type EquipmentImageId,
  type EquipmentType,
} from '@opfr/definitions';

import { CreateEntityDto } from './create-entity.dto';

export class CreateEquipmentDto extends OmitType(CreateEntityDto, [
  'type',
  'image',
  'category',
  'characteristics',
  'level',
  'panoply',
] as const) {
  @ApiProperty({ enum: EQUIPMENT_TYPE })
  @IsIn(EQUIPMENT_TYPE)
  type!: EquipmentType;

  @ApiProperty({ enum: EQUIPMENT_IMAGE_IDS })
  @IsIn(EQUIPMENT_IMAGE_IDS)
  image!: EquipmentImageId;

  @ApiProperty({ example: 'equipment', enum: ['equipment'] })
  @Equals('equipment')
  category!: 'equipment';

  @DocCharacteristics()
  @IsCharacteristicsValid()
  characteristics!: Partial<Record<Characteristic, [number, number] | number>>;

  @ApiProperty({ type: 'number', example: 30 })
  @IsNumber()
  level!: number;

  @ApiProperty({ type: 'string', example: 'herbalist' })
  @IsString()
  panoply!: string;
}
