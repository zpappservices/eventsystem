import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VendorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  company: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  jobTitle: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  website: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  photo: string;
}

export class UpdateVendorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  company: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  jobTitle: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  website: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  photo: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  bio: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  state: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  zipcode: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  country: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  facebook: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  twitter: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  instagram: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  linkedin: string;
}

export class FollowDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  vendorId: string;
}
