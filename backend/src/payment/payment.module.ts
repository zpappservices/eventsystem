import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@/integrations/prisma/prisma.module';
import { EmailerService } from '@/integrations/email/emailer.service';


@Module({
  imports: [HttpModule, PrismaModule],
  providers: [PaymentService, EmailerService],
  controllers: [PaymentController]
})
export class PaymentModule {}
