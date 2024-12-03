import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { OrderDto, PaymentDto, SubaccountDto, PaymentStatusEnum, S3BucketEnum } from './dtos/payment.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/integrations/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Event, EventTransaction } from '@prisma/client';
import * as QRCode from 'qrcode';
import { EmailerService } from '@/integrations/email/emailer.service';
import { AwsS3Service } from '@/integrations/amazons3/aws-s3.service';

@Injectable()
export class PaymentService {

    constructor(private readonly httpService: HttpService, 
        private readonly configService: ConfigService,
        private emailService: EmailerService,
        private awsS3Service: AwsS3Service,
        private prisma: PrismaService) {}

    private async makeRequest(endpoint: string, method: 'get' | 'post', data: any = {}) {
        try {

          console.log(`Url: ${endpoint} || \n Request: ${JSON.stringify(data)} `)

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
          console.log(`Url: ${endpoint} :: \n Response: ${JSON.stringify(response.data)} `)
          return response.data;

        } catch (error) {
            console.log(error.response?.data || 'Paystack Error')

            console.log(`Error: ${JSON.stringify(error)}`)
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

      async buildTransactions(data: OrderDto,event: Event, batchId: string){

        let transactionList = [];
        await data.tickets.forEach( t => {

            for(let i = 0; i < t.quantity; i++){
              let ticket = { batchId: batchId, eventId: data.eventId, eventName: event.title, 
                userId: data.userId, ticketId: `Tic-${uuidv4()}`, ticketName: t.name, price: t.amount }
              
                transactionList.push(ticket);
            }
        });

        return transactionList;

      }

      async placeOrder(data: OrderDto) {

        try{
          const url = `${this.configService.get('PAYSTACK_PAYMENT_REQUEST')}`
          const charge = `${this.configService.get('PAYSTACK_CHARGE')}`
          //data.percentage_charge = charge

          // Verify user
          const user = await this.prisma.user.findUnique({ where: { id: data.userId } });

          if(!user){
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              data: null,
              message: `User with id ${data.userId} is in-valid.`,
            };
          }

          // Verify event
          const event = await this.prisma.event.findUnique({ where: { id: data.eventId } });

          if(!event){
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              data: null,
              message: `Event with id ${data.eventId} is in-valid.`,
            };
          }
          const callBackUrl = `${this.configService.get('PAYSTACK_CALL_BACK')}`
          const batchId = uuidv4();
          const amount = parseFloat(data.totalAmount) * 100;
          const req = { amount: amount, email: data.email,
             currency: event.currency, reference: batchId, callback_url: callBackUrl };

          const res = await this.makeRequest(`${url}`, 'post', req);

          if(!res.status){
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              data: null,
              message: `Unable to create account`,
            };
          } 
                    
          const  transactionList = await this.buildTransactions(data, event, batchId)
          
          const logTransaction = await this.prisma.eventTransaction.createMany({
            data: transactionList.map( t => ({
              batchId: t.batchId,
              eventId: t.eventId,
              eventName: t.eventName,
              ticketId: t.ticketId,
              ticket: t.ticketName,
              userId: t.userId,
              price: t.price,
              createdBy: "System",
              createdOn: new Date()
            })),
            skipDuplicates: true, // Skip 'Bobo'
          })

        return {
          statusCode: HttpStatus.CREATED,
          data: res,
          message: 'Payment request initialize.',
        };
        }catch(err){
          console.log(err);
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          data: null,
          message: 'Operation fail.',
          };
        }
        
      }

      async verifyAndUpdateTransaction(reference: string) {
        
        try{

          // Verify Transaction
          const res = await this.verifyTransaction(reference);

          if(!res.status){
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              data: null,
              message: `Unable to validate payment`,
            };
          }

          // Verify Transaction
          const pending = await this.prisma.eventTransaction.findMany({
            where: { batchId: reference},
            include: { event: true, user: true}
          }); 

          if(!pending){
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              data: null,
              message: `Unable to get pending transaction`,
            };
          }

          const account = await this.prisma.eventTransaction.updateMany({
            where: { batchId: reference },
            data: {
              status: PaymentStatusEnum.PAID,
              updatedOn: new Date(),
            },
          }); 

          const qrcodes = await this.generateQRCodes(pending);

        return {
          statusCode: HttpStatus.OK,
          data: reference,
          message: 'successfully.',
        };
        }catch(err){
          console.log(err);
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          data: null,
          message: 'Unable to verify payment.',
          };
        }
        
      }
      
      async generateQRCodes(transactions: EventTransaction[]): Promise<any> {
        try {

          const qrCodes = []

          for (const t of transactions) {

            const qrData = { ticketId: t.ticketId, ticketType: t.ticket, eventName: t.eventName, amount: t.price, ref: t.batchId, event: t.eventName };
            //const transactionData = JSON.stringify(qrData);

            // Generate QR Code as a data URL (Base64 image)
            // const qrCode = await QRCode.toDataURL(transactionData, {
            //   width: 300, // Size of the QR Code
            // });

            const qrCode = await this.generateQrCode(qrData)

            qrCodes.push(qrCode);

            const imageUrl = await this.awsS3Service.uploadBase64( S3BucketEnum.TICKET, t.ticketId, qrCode )

            try {
              await this.emailService.sendTicketQRCode({ transaction: t, imageUrl });
            } catch (e) {
              console.log(e.message);
            }
          }       
    
          return qrCodes; // Return the QR Code as a Base64 string
        } catch (error) {
          throw new Error(`Error generating QR Code: ${error.message}`);
        }
      }

      async generateQrCode(transactionData: object): Promise<string> {
        try {
          // Convert transaction data to a JSON string
          const dataString = JSON.stringify(transactionData);
      
          // Generate QR Code as a Data URL
          const qrCode = await QRCode.toDataURL(dataString, {
            width: 300,
          });
      
          return qrCode; // Return the Base64 string
        } catch (error) {
          throw new Error(`Failed to generate QR code: ${error.message}`);
        }
      }

      async getTransactionByReg(id: string) {

        try{
          const transactions = await this.prisma.eventTransaction.findMany({ where: { batchId: id } });

          if(!transactions){
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              data: null,
              message: `Reference with id ${id} not found.`,
            };
          }

        return {
          statusCode: HttpStatus.OK,
          data: transactions,
          message: 'successfully.',
        };
        }catch(err){
          console.log(err);
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          data: null,
          message: 'Unable to fetch transaction.',
          };
        }
        
      }
}
