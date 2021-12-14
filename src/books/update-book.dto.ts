import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  subtitle?: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { each: true },
  )
  @IsOptional()
  authorIds?: number[];
}
