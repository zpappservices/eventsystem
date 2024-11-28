import { Decimal } from "@prisma/client/runtime";
import { IsDecimal, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
  
  }