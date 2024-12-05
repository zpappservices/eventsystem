import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class EmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}


export class ActivateAccountDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  otp: string;
}
