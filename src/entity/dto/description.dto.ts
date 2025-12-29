import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DescriptionDTO {
  @ApiProperty({ type: String })
  @IsString()
  key!: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  context?: string;
}
