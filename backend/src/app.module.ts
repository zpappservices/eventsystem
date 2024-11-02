import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './integrations/prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { DecryptRequestInterceptor, EncryptResponseInterceptor } from './utils/interceptor';
import { EmailerModule } from './integrations/email/emailer.module';
import { FirebaseService } from './auth/utils/firebase.service';
@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    EmailerModule,
    JwtModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 100,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 1000,
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),

    PassportModule.register({ session: true }),
  ],

  controllers: [],
  providers: [
    FirebaseService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    //To handle the encryption and decryption of request and response
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DecryptRequestInterceptor,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: EncryptResponseInterceptor,
    // },
  ],
})
export class AppModule {}
