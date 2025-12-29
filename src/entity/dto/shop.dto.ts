import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class ShopDTO {
  @ApiProperty({ type: Number })
  @IsNumber()
  price!: number;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  odd?: number;
}
