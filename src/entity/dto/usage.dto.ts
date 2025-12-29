import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import type { UsageMode } from '@opfr/definitions';

class DismantleDTO {
  @ApiProperty({ type: String })
  @IsString()
  entityId!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  quantity!: number;
}

export class UsageDTO {
  @ApiProperty({ type: String }) //préciser enum usageMode
  @IsOptional()
  @IsString() //Same Shit
  mode?: UsageMode;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  craft?: boolean;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  enchant?: string;

  @ApiProperty({ type: DismantleDTO, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => DismantleDTO)
  dismantle?: DismantleDTO;
}
