import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { OrderDto, PaymentDto, SubaccountDto } from './dtos/payment.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/integrations/prisma/prisma.service';

@Injectable()
export class PaymentService {

    constructor(private readonly httpService: HttpService, 
        private readonly configService: ConfigService,
        private prisma: PrismaService) {}

    private async makeRequest(endpoint: string, method: 'get' | 'post', data: any = {}) {
        try {

          const response = await lastValueFrom(
            this.httpService.request({
              method,
              url: endpoint,
              data,
              headers: {
                Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET_KEY')}`,
              },
            }),
          );
          return response.data;

        } catch (error) {
            console.log(error.response?.data || 'Paystack Error')
            // return {
            //     statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            //     data: error.response?.data,
            //     message: 'Fail',
            //   };
          throw new BadRequestException(error.response?.data || 'Paystack Error', error.response?.status || 500);
        }
      }
    
      async initializeTransaction(data: PaymentDto) : Promise<any> {
        const url = `${this.configService.get('PAYSTACK_PAYMENT_REQUEST')}`
        return this.makeRequest(url, 'post', data);
      }
    
      async verifyTransaction(reference: string) {
        const url = `${this.configService.get('PAYSTACK_PAYMENT_VERIFY')}`
        return this.makeRequest(`${url}/${reference}`, 'get');
      }
      async transactionList() {
        const url = `${this.configService.get('PAYSTACK_TRANSACTION_LIST')}`
        return this.makeRequest(`${url}`, 'get');
      }
      async fetchTransaction(transId: string) {
        const url = `${this.configService.get('PAYSTACK_FETCH_TRANSACTION')}`
        return this.makeRequest(`${url}/${transId}`, 'get');
      }
      async createSubaccount(data: SubaccountDto) {

        try{
          const url = `${this.configService.get('PAYSTACK_SUBACCOUNT')}`
          const charge = `${this.configService.get('PAYSTACK_CHARGE')}`
          data.percentage_charge = charge

          const vendor = await this.prisma.vendor.findFirst({ where: { userId: data.userId } });

          if(!vendor){
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              data: null,
              message: `User with id ${data.userId} is not a valid vendor.`,
            };
          }

          const res = await this.makeRequest(`${url}`, 'post', data);

          if(!res.status){
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              data: null,
              message: `Unable to create account`,
            };
          }

          const account = await this.prisma.vendorAccount.create({
          data: {
            bankCode: res.data.bank.toString(),
            bankName: res.data.settlement_bank,
            accountId: res.data.subaccount_code,
            accountNumber: res.data.account_number,
            accountName: res.data.account_name,
            currency: res.data.currency,
            createdOn: new Date(),
            active: true,
            userId: data.userId
          },
        }); 

        return {
          statusCode: HttpStatus.CREATED,
          data: account,
          message: 'Account created successfully.',
        };
        }catch(err){
          console.log(err);
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          data: null,
          message: 'Unable to create account.',
          };
        }
        
      }
      async bankList() {
        const url = `${this.configService.get('PAYSTACK_BANK')}`
        return this.makeRequest(`${url}`, 'get');
      }

      async placeOrder(data: OrderDto) {

        try{
          const url = `${this.configService.get('PAYSTACK_SUBACCOUNT')}`
          const charge = `${this.configService.get('PAYSTACK_CHARGE')}`
          //data.percentage_charge = charge

          const user = await this.prisma.user.findUnique({ where: { id: data.userId } });

          if(!user){
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              data: null,
              message: `User with id ${data.userId} is in-valid.`,
            };
          }

          const res = await this.makeRequest(`${url}`, 'post', data);

          if(!res.status){
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              data: null,
              message: `Unable to create account`,
            };
          }

          const account = await this.prisma.vendorAccount.create({
          data: {
            bankCode: res.data.bank.toString(),
            bankName: res.data.settlement_bank,
            accountId: res.data.subaccount_code,
            accountNumber: res.data.account_number,
            accountName: res.data.account_name,
            currency: res.data.currency,
            createdOn: new Date(),
            active: true,
            userId: data.userId
          },
        }); 

        return {
          statusCode: HttpStatus.CREATED,
          data: account,
          message: 'Account created successfully.',
        };
        }catch(err){
          console.log(err);
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          data: null,
          message: 'Unable to create account.',
          };
        }
        
      }
}
