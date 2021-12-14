import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateAuthorDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;
}
