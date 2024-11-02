import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailerService {
  constructor(private mailerService: MailerService) {}

  async sendMail(data: any, subject: string, template: string) {
    return this.mailerService.sendMail({
      to: data.email,
      subject: subject,
      template: template,
      context: data,
    });
  }

  async sendWelcome(data: any) {
    const payload = {
      email: data.user.email,
      firstName: data.user.username,
      url: data.welcomeURL,
    };
    await this.sendMail(payload, 'Welcome Onboard', 'welcome');
  }
  async sendActivateAccount(data: any) {
    const payload = {
      email: data.user.email,
      firstName: data.user.username,
      otp: data.otp,
    };
    await this.sendMail(payload, 'Account Activation', 'activateaccount');
  }
  async sendPasswordReset(data: any) {
    const payload = {
      email: data.user.email,
      firstName: data.user.firstName,
      url: data.activateURL,
    };
    await this.sendMail(payload, 'Password Reset', 'passwordreset');
  }
}
