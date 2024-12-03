import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@/integrations/prisma/prisma.module';
import { EmailerService } from '@/integrations/email/emailer.service';
import { AwsS3Service } from '@/integrations/amazons3/aws-s3.service';


@Module({
  imports: [HttpModule, PrismaModule],
  providers: [PaymentService, EmailerService, AwsS3Service],
  controllers: [PaymentController]
})
export class PaymentModule {}
