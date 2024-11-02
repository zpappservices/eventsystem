import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '@/integrations/prisma/prisma.module';
import { UserService } from './user.service';
import { AuthModule } from '@/auth/auth.module';
import { FirebaseService } from '@/auth/utils/firebase.service';
import { AuthService } from '@/auth/auth.service';
import { EmailerService } from '@/integrations/email/emailer.service';
@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, AuthService, AuthModule, EmailerService, FirebaseService],
  exports: [UserService],
})
export class UserModule {}
