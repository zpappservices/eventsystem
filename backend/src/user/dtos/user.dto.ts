import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class VendorDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
    
    @IsNotEmpty()
    @IsString()
    phone: string;
        
    @IsNotEmpty()
    @IsString()
    email: string;
            
    @IsNotEmpty()
    @IsString()
    company: string;
            
    @IsOptional()
    @IsString()
    jobTitle: string;
                
    @IsOptional()
    @IsString()
    website: string;
                   
    @IsOptional()
    @IsString()
    photo: string;
  }