import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsObject } from 'class-validator';

import { EFFECT_KEYS } from '@opfr/definitions';

export class EffectDTO {
  @ApiProperty({ enum: EFFECT_KEYS })
  @IsIn(EFFECT_KEYS)
  type!: string;

  @ApiProperty() //Jsp ce que jdois typer frr
  @IsObject()
  params!: Record<string, any>;
}
