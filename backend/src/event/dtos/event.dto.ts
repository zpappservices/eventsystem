import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Type } from 'class-transformer';
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
  IsInt,
  isArray,
  ValidateNested,
  isInt,
  IsArray,
} from 'class-validator';

export enum TicketType {
  paid = 'Paid',
  free = 'Free',
  donation = 'Donation',
}

export enum Currency {
  NGN = 'NGN',
  USD = 'USD',
  GHS = 'GHS',
  ZAR = 'ZAR',
}
export enum LocationType {
  ONLINE = 'ONLINE',
  PHYSICAL = 'PHYSICAL',
  HYBRID = 'HYBRID',
}
export enum RestrictionType {
  None = 'None',
  ChildrenOnly = 'Children Only',
  WomenOnly = 'Women Only',
  NoChildren = 'No Children',
  SeniorCitizen = 'Senior Citizen',
  Adult = '18Plus',
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
  @IsEnum(EventType)
  @ApiProperty()
  eventType: EventType;

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
  @ApiProperty({ required: false })
  AllDay: boolean;

  @IsOptional()
  @IsArray()
  @ApiProperty({ required: false })
  image_banner: string[];

  @IsOptional()
  @IsArray()
  @ApiProperty({ required: false })
  venueImage: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  image_tile: string;

  @IsOptional()
  @IsEnum(RestrictionType)
  @ApiProperty()
  restrictionLevel: RestrictionType;

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

  @IsOptional()
  @IsEnum(Currency)
  @ApiProperty()
  currency: Currency;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty()
  price: Decimal;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty()
  minOrder: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty()
  maxOrder: number;
}

export class TicketDto {
  @IsNotEmpty()
  @IsEnum(TicketType)
  @ApiProperty()
  type: TicketType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  quantity: number;

  @IsOptional()
  @IsEnum(Currency)
  @ApiProperty()
  currency: Currency;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty()
  price: Decimal;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty()
  minOrder: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty()
  maxOrder: number;
}

export class EventLocationDto {
  @IsOptional()
  @IsEnum(LocationType)
  @ApiProperty()
  locationType?: LocationType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  location: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  venueName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  latlong: string;
}

export class VendorEventDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => EventDto)
  @ApiProperty({ type: () => EventDto })
  eventDto: EventDto;

  // @IsNotEmpty()
  // @ApiProperty()
  // contactDto: EventContactDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => EventLocationDto)
  @ApiProperty({ type: () => EventLocationDto })
  locationDto: EventLocationDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  @ApiProperty({ type: () => [TicketDto] })
  ticketDto: TicketDto[];
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

export class FilterEventDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  search?: string;

  @IsOptional()
  @ApiProperty()
  date?: string;

  @IsOptional()
  @ApiProperty()
  category: string[];

  @IsOptional()
  @ApiProperty()
  eventType: EventType;

  @IsOptional()
  @ApiProperty()
  level: RestrictionType;

  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;
}

export class EventTransactionDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  eventId: string;

  @IsOptional()
  @ApiProperty()
  //@IsDateString()
  date?: string;

  @IsOptional()
  @ApiProperty()
  ticket?: string;

  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;
}
