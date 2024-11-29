import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@/integrations/prisma/prisma.module';


@Module({
  imports: [HttpModule, PrismaModule],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
