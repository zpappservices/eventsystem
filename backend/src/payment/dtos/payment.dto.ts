import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime";
import { IsArray, IsDecimal, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PaymentDto {

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

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
    transId: string;

    @IsDecimal()
    @ApiProperty()
    amount: Decimal;
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    subaccount: string;
        
    @IsOptional()
    @IsString()
    @ApiProperty()
    bearer: string;
            
    @IsOptional()
    @IsString()
    @ApiProperty()
    charge: string;
  }

  export class SubaccountDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    business_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    settlement_bank: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    account_number: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    percentage_charge: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    userId: string;
  
  }

  export class OrderDto {

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

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
    eventId: string;
      
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    channel: string;
     
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    userId: string;

    @IsDecimal()
    @ApiProperty()
    totalAmount: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    email_CC: string;
        
    @IsNotEmpty()
    @IsArray()
    @ApiProperty()
    tickets: TicketDto[];

  }

  export class TicketDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsDecimal()
    @ApiProperty()
    amount: Decimal;
  
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    quantity: number;
  }

  export enum PaymentStatusEnum {
    "PENDING" = "PENDING",
    "PAID" = "PAID",
    "FAILED" = "FAILED",
  }

  
  export enum S3BucketEnum {
    "TICKET" = "TICKET",
    "BANNER" = "BANNER",
    "IMAGE" = "IMAGE",
    "CATEGORY" = "CATEGORY",
  }
