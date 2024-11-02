import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '@/integrations/prisma/prisma.module';
import { SessionSerializer } from './utils/Serializer';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from './utils/firebase.service';
import { UserService } from '@/user/user.service';
import { EmailerService } from '@/integrations/email/emailer.service';
import { EmailerModule } from '@/integrations/email/emailer.module';
import { LinkedinStrategy } from './strategy/linkedln.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    EmailerModule,
    PassportModule,
    // JwtModule.register({
    //   global: true,
    //   secret: '1234',
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  providers: [AuthService, SessionSerializer, 
    ConfigService, UserService, FirebaseService, EmailerService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
