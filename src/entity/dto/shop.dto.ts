import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class ShopDTO {
  @ApiProperty({ type: Number, example: 100_000 })
  @IsNumber()
  price!: number;

  @ApiProperty({ type: Number, required: false, example: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiProperty({ type: Number, required: false, example: 0.1 })
  @IsOptional()
  @IsNumber()
  @Max(1)
  @Min(1)
  odd?: number;
}
