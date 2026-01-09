import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsObject } from 'class-validator';

import { EFFECT_KEYS } from '@opfr/definitions';

export class EffectDTO {
  @ApiProperty({ enum: EFFECT_KEYS })
  @IsIn(EFFECT_KEYS)
  type!: string;

  @ApiProperty()
  @IsObject()
  params!: Record<string, unknown>;
}
