import { ApiProperty } from '@nestjs/swagger';
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
  IsBase64,
} from 'class-validator';


export enum LocationType {
  venue = 'venue',
  online = "online",
  toBeAnnounced = "toBeAnnounced",
}

export enum TicketType {
  paid = 'Paid',
  free = "Free",
  donation = "Donation",
}

export enum Currency {
  NGN = 'NGN',
  USD = "USD",
  GHS = "GHS",
  ZAR = "ZAR",
}

export class EventDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  
  @IsOptional()
  @IsString()
  @ApiProperty()
  location: string;

  @IsOptional()
  @IsEnum(LocationType)
  @ApiProperty()
  locationType?: LocationType;
 
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  endDate: Date;
   
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  startTime: string;
   
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  endTime: string;

     
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  AllDay: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  image_banner: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  image_tile: string;
    
  @IsOptional()
  @IsEnum(Currency)
  @ApiProperty()
  currency: Currency;
  
  // @IsOptional()
  // contact: EventContact;

  @IsOptional()
  @IsString()
  @ApiProperty()
  createdBy: string;
}


export class EventContactDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  eventId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  facebook: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  instagram: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  twitter: string;
}



export class EventTicketDto {

  @IsNotEmpty()
  @IsEnum(TicketType)
  @ApiProperty()
  type: TicketType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  eventId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  quantity: number;
  
  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty()
  price: Decimal;
  
}


export class VendorEventDto {

  @IsNotEmpty()
  @ApiProperty()
  eventDto: EventDto;

  @IsNotEmpty()
  @ApiProperty()
  contactDto: EventContactDto;

  @IsOptional()
  @ApiProperty()
  ticketDto: EventTicketDto[];

}

export class EventImageDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  image: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  eventId: string;

}


export class CheckinDto {

  @IsNotEmpty()
  @ApiProperty()
  eventId: string;

  @IsNotEmpty()
  @ApiProperty()
  ticketId: string;

}


