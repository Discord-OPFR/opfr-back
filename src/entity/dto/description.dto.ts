import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DescriptionDTO {
  @ApiProperty({
    type: String,
    example: 'equipments.adventurer.strap.description',
  })
  @IsString()
  key!: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  context?: string;
}
