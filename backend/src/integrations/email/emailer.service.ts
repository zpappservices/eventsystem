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

  async sendTicketQRCode(data: any) {
    const payload = {
      //email: data.transaction.user.email,
      email: "hbshofela@gmail.com",
      username: data.transaction.user.username,
      qrCode: data.qrCode,
      id: data.transaction.id,
      amount: data.transaction.price,
      type: data.transaction.ticket,
      event: data.transaction.eventName,
      date: data.transaction.event.StartDate,
    };
    await this.sendMail(payload, 'Ticket QR Code', 'ticket');
  }
}
