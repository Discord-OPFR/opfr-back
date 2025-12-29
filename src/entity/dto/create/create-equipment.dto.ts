import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsCharacteristicsValid } from '@common/decorator';
import { Equals, IsNumber, IsString } from 'class-validator';

import type { Characteristic, EquipmentImageId, EquipmentType } from '@opfr/definitions';

import { CreateEntityDto } from './create-entity.dto';

export class CreateEquipmentDto extends OmitType(CreateEntityDto, ['type', 'image', 'category', 'characteristics', 'level', 'panoply'] as const) {
  @IsString() //encore et tjr
  type!: EquipmentType;

  @IsString()
  image!: EquipmentImageId;

  @ApiProperty({ example: 'equipment', enum: ['equipment']})
  @Equals('equipment')
  category!: 'equipment';

  @IsCharacteristicsValid()
  characteristics!: Partial<Record<Characteristic, [number, number] | number>>;

  @ApiProperty({ type: 'number', example: 30 })
  @IsNumber()
  level!: number;

  @ApiProperty({ type: 'string', example: 'herbalist' })
  @IsString()
  panoply!: string;
}
