import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { USAGE_MODES, type UsageMode } from '@opfr/definitions';

class DismantleDTO {
  @ApiProperty({ type: String, example: 'wood' })
  @IsString()
  entityId!: string;

  @ApiProperty({ type: Number, example: 3 })
  @IsNumber()
  quantity!: number;
}

export class UsageDTO {
  @ApiProperty({ enum: USAGE_MODES, example: 'single', required: false })
  @IsOptional()
  @IsIn(USAGE_MODES)
  mode?: UsageMode;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  craft?: boolean;

  @ApiProperty({ type: String, required: false, example: 'enchant_clover' })
  @IsString()
  @IsOptional()
  enchant?: string;

  @ApiProperty({ type: DismantleDTO, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => DismantleDTO)
  dismantle?: DismantleDTO;
}
