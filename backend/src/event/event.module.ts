import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaModule } from '@/integrations/prisma/prisma.module';
import { AwsS3Service } from '@/integrations/amazons3/aws-s3.service';

@Module({
  imports: [PrismaModule],
  providers: [EventService, AwsS3Service],
  controllers: [EventController]
})
export class EventModule {}
