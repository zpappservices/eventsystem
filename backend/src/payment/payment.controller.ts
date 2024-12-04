import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { OrderDto, PaymentDto, SubaccountDto } from './dtos/payment.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService, 
      private readonly configService: ConfigService) {}

  @Post('/initiate-payment')
  async initiatePayment(@Body() dto: PaymentDto): Promise<any> {
    return this.paymentService.initializeTransaction(dto);
  }
  @Get('/payment-callback')
  async paymentCallback(@Query('reference') reference: string, @Res() res: Response): Promise<any> {
    const result = await this.paymentService.verifyAndUpdateTransaction(reference);

    let returnUrl = this.configService.get('RECEIPT_URL')
    if(result.statusCode == HttpStatus.OK){
      returnUrl = `${returnUrl}?reference=${returnUrl.data}&success=true`
    }
    else{
      returnUrl = `${returnUrl}?reference=xxx&success=false`
    }
    res.redirect(returnUrl);
  }
  @Post('/place-order')
  async placeOrder(@Body() dto: OrderDto): Promise<any> {
    return this.paymentService.placeOrder(dto);
  }
  @Post('/create-subaccount')
  async createSubaccount(@Body() dto: SubaccountDto): Promise<any> {
    return this.paymentService.createSubaccount(dto);
  }
  
  @Get('/verify-transaction/:id')
  async verifyTransaction(@Param() id: string): 
  Promise<any> {
    return this.paymentService.verifyTransaction(id);
  }
  @Get('/transaction-list')
  async transactionList(): Promise<any> {
    return this.paymentService.transactionList();
  }
  @Get('/get-one-transaction/:id')
  async getOneTransaction(@Param() id: string): Promise<any> {
    return this.paymentService.fetchTransaction(id);
  }  
  @Get('/gettransactionbyref/:id')
  async getTransactionByReg(@Param('id') id: string): Promise<any> {
    return this.paymentService.getTransactionByReg(id);
  }
  @Get('/getAllbank')
  async getAllBank(): Promise<any> {
    return this.paymentService.bankList();
  }
}
