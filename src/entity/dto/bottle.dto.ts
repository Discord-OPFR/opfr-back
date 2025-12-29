import { ApiProperty } from '@nestjs/swagger';
import { ApiNumberOrTuple } from '@common/decorator';
import { IsNumberOrNull, IsNumberOrTuple } from '@common/decorator';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

import { Buff, type BuffOrigin, type BuffTreePath } from '@opfr/definitions';

class BuffDTO {
  @ApiProperty()
  @IsObject()
  target!: BuffTreePath;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  multiplier!: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  origin!: BuffOrigin;

  @ApiProperty({ type: 'number', nullable: true, example : 61000 })
  @IsNumberOrNull()
  startIn!: number | null;

  @ApiProperty({ type: 'number', nullable: true })
  @IsNumberOrNull()
  endIn!: number | null;
}

export class BottleDTO {
  @ApiNumberOrTuple()
  @IsNumberOrTuple()
  xp!: [number, number] | number;

  @ApiProperty({ type: [BuffDTO] })
  @ValidateNested({ each: true })
  @Type(() => BuffDTO)
  buffs!: Buff[];

  @ApiProperty({ type: 'number', example: 50 })
  @IsOptional()
  @IsNumber()
  hp?: number;

  @ApiProperty({ enum: [1, 2, 3, 4], example: 1 })
  @IsNumber()
  @IsIn([1, 2, 3, 4])
  tier!: 1 | 2 | 3 | 4;
}
