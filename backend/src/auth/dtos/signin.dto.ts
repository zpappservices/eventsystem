import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @ApiProperty()
  password: string;
}
