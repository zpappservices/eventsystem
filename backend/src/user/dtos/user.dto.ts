import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
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