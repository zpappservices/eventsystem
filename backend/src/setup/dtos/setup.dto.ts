import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  IsInt,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  createdBy: string;
}
