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

export class IsLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;

}


export class AccountClosure {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;
}
