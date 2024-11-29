import { Decimal } from "@prisma/client/runtime";
import { IsArray, IsDecimal, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PaymentDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @IsNotEmpty()
    @IsString()
    transId: string;

    @IsDecimal()
    amount: Decimal;
    
    @IsOptional()
    @IsString()
    subaccount: string;
        
    @IsOptional()
    @IsString()
    bearer: string;
            
    @IsOptional()
    @IsString()
    charge: string;
  }

  export class SubaccountDto {

    @IsNotEmpty()
    @IsString()
    business_name: string;

    @IsNotEmpty()
    @IsString()
    settlement_bank: string;

    @IsNotEmpty()
    @IsString()
    account_number: string;
    
    @IsOptional()
    @IsString()
    percentage_charge: string;

    @IsNotEmpty()
    @IsString()
    userId: string;
  
  }

  export class OrderDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @IsNotEmpty()
    @IsString()
    eventId: string;
      
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsDecimal()
    toalAmount: Decimal;
    
    @IsOptional()
    @IsString()
    email_CC: string;
        
    @IsNotEmpty()
    @IsArray()
    tickets: TicketDto[];

  }

  export class TicketDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDecimal()
    amount: Decimal;
  
    @IsNotEmpty()
    @IsInt()
    quantity: number;
  }