import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  IsInt,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  businessType: string;

  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsNotEmpty()
  @IsInt()
  numberOfEmployee: number;

  @IsString()
  googleId: string;

  @IsString()
  facebookId: string;
}


export class WaitingListDto {
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
    
  @IsNotEmpty()
  @IsString()
  usage: string;

}
