import { Module } from '@nestjs/common';
import { EmailerService } from './emailer.service';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          service: 'Hostinger',
          host: 'smtp.hostinger.com',
          port: 465, // Use 587 for TLS
          secure: true, // Use false for TLS (port 587)         
          auth: {
            user: 'no-reply@zafariplus.com',
            pass: 'Blu3icon@2018!',
            
          },
        },
        defaults: {
          from: 'no-reply@zafariplus.com',
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
        },
        options: { strict: true },
      }),
    }),
  ],
  providers: [EmailerService],
  exports: [EmailerService]
})
export class EmailerModule {}
