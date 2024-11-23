import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class EventDto {
  
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  location: string;
 
  @IsNotEmpty()
  @IsDateString()
  StartDate: Date;

  @IsNotEmpty()
  @IsDateString()
  EndDate: Date;
   
  @IsNotEmpty()
  @IsString()
  StartTime: string;
   
  @IsNotEmpty()
  @IsString()
  EndTime: string;

     
  @IsOptional()
  @IsBoolean()
  AllDay: boolean;

  @IsOptional()
  @IsString()
  image_banner: string;
  
  @IsOptional()
  @IsString()
  image_tile: string;
  
  @IsOptional()
  contact: EventContact;

  @IsOptional()
  @IsString()
  createdBy: string;
}

export class EventContact {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  facebook: string;
  
  @IsOptional()
  @IsString()
  instagram: string;
  
  @IsOptional()
  @IsString()
  twitter: string;
}

