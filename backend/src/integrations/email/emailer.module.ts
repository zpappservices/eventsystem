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
          host: 'smtp.gmail.com',
          auth: {
            user: 'hbshofela@gmail.com',
            pass: 'evnbqqaiqwunmkqb',
          },
        },
        defaults: {
          from: 'noreply@bravestride.io',
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
