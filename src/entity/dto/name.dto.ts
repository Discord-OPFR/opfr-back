import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class NameDTO {
  @ApiProperty({ type: String, example: 'items.chest.ultimate' })
  @IsString()
  key!: string;

  @ApiProperty({ type: String, example: 'sapphire', required: false })
  @IsString()
  @IsOptional()
  context?: string;
}
