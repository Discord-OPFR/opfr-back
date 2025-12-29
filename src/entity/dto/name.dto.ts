import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class NameDTO {
  @ApiProperty({ type: String, example: 'wood' })
  @IsString()
  key!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  content?: string;
}
