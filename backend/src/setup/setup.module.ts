import { Module } from '@nestjs/common';
import { SetupService } from './setup.service';
import { SetupController } from './setup.controller';
import { PrismaModule } from '@/integrations/prisma/prisma.module';
import { SetupDataMock } from './setup.data.mock';

@Module({
  imports: [PrismaModule],
  providers: [SetupService, SetupDataMock],
  controllers: [SetupController]
})
export class SetupModule {}
