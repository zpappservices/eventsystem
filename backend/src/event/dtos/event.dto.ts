import { Decimal } from '@prisma/client/runtime';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  Min,
  IsDecimal,
} from 'class-validator';


export enum LocationType {
  venue = 'venue',
  online = "online",
  toBeAnnounced = "toBeAnnounced",
}

export class EventDto {

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  
  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsEnum(LocationType)
  locationType?: LocationType;
 
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
   
  @IsNotEmpty()
  @IsString()
  startTime: string;
   
  @IsNotEmpty()
  @IsString()
  endTime: string;

     
  @IsOptional()
  @IsBoolean()
  AllDay: boolean;

  @IsOptional()
  @IsString()
  image_banner: string;
  
  @IsOptional()
  @IsString()
  image_tile: string;
  
  // @IsOptional()
  // contact: EventContact;

  @IsOptional()
  @IsString()
  createdBy: string;
}

export class EventContactDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  eventId: string;

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



export class EventTicketDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: string;
  
  @IsNotEmpty()
  @IsDecimal()
  price: Decimal;
  
}


