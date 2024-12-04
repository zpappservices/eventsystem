import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty()
  password: string;

}

export class SingleSignonDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  provider: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  uid: string;

    
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  displayName: string;
}
