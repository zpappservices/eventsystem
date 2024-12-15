import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class EmailerService {
  constructor(private mailerService: MailerService) {}

  async sendMail(data: any, subject: string, template: string ) {
    return this.mailerService.sendMail({
      to: data.email,
      cc: data.email_cc!,
      subject: subject,
      template: template,
      context: data
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
      url: data.link,
    };
    await this.sendMail(payload, 'Password Reset', 'passwordreset');
  }

  async sendTicketQRCode(data: any) {
    const payload = {
      email: data.transaction.user.email,
      //email: "hbshofela@gmail.com",
      username: data.transaction.user.username,
      qrCode: data.imageUrl,
      id: data.transaction.id,
      amount: data.transaction.price,
      type: data.transaction.ticket,
      event: data.transaction.eventName,
      date: format(data.transaction.event.StartDate, 'MMM dd, yyyy'),
      time: data.transaction.event.StartTime,
      location: data.transaction.event.location,
      email_cc: data.transaction.user.email != data.email ? data.email : ""
    };
    const x = await this.sendMail(payload, 'Ticket Details', 'ticket');
  }
}
