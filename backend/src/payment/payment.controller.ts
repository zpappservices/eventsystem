import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { OrderDto, PaymentDto, SubaccountDto } from './dtos/payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

  @Post('/initiate-payment')
  async initiatePayment(@Body() dto: PaymentDto): Promise<any> {
    return this.paymentService.initializeTransaction(dto);
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
  async verifyTransaction(@Param() id: string): Promise<any> {
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
  @Get('/getAllbank')
  async getAllBank(): Promise<any> {
    return this.paymentService.bankList();
  }
}
