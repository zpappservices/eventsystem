import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  createdBy: string;
}
