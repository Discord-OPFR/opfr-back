import { ApiProperty } from '@nestjs/swagger';
import { IsDateOrNull } from '@shared/decorator';
import { ToBoolean } from '@shared/decorator/transform';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

import { FACTIONS, type FactionId } from '@opfr/definitions';

export class ResponseUserDto {
  @ApiProperty({ type: String })
  @IsString()
  discordId!: string;

  @ApiProperty({ type: Date })
  @Transform(({ value }) => {
    if (value === 'null') return null;

    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date;
  })
  @IsDateOrNull()
  birthday!: Date | null;

  @ApiProperty({ enum: Object.keys(FACTIONS) })
  @IsEnum(Object.keys(FACTIONS))
  faction!: FactionId;

  @ApiProperty({ type: Boolean })
  @ToBoolean()
  @IsBoolean()
  canChangeFaction!: boolean;

  @ApiProperty({ type: Boolean })
  @ToBoolean()
  @IsBoolean()
  canChooseFaction!: boolean;
}
