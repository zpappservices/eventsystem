import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class EmailerService {
  constructor(private mailerService: MailerService) {}

  async sendMail(data: any, subject: string, template: string) {
    return this.mailerService.sendMail({
      to: data.email,
      cc: data.email_cc!,
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
      url: data.link,
    };
    await this.sendMail(payload, 'Password Reset', 'passwordreset');
  }

  async vendorOnBoarding(data: any) {
    const payload = {
      email: 'cs@zafariplus.com',
      vendoremail: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      phone: data.user.phone,
      company: data.user.company,
      website: data.user.website,
    };
    await this.sendMail(payload, 'New Vendor Onboarded', 'vendor');
  }

  async newUserNotify(data: any) {
    const payload = {
      email: 'cs@zafariplus.com',
      useremail: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      phone: data.user.phone,
    };
    await this.sendMail(payload, 'New User Registered', 'newuser');
  }

  async sendTicketQRCode(data: any) {
    const payload = {
      email: data.transaction.user.email,
      username: data.transaction.user.username,
      qrCode: data.imageUrl,
      id: data.transaction.id,
      image_banner: data.transaction.event.image_banner,
      amount: data.transaction.price,
      type: data.transaction.ticket,
      event: data.transaction.eventName,
      category: data.transaction.event.category,
      date: format(data.transaction.event.StartDate, 'MMM dd, yyyy'),
      //endDate: format(data.transaction.event.EndDate, 'MMM dd, yyyy'),
      time: this.convertToAmPm(data.transaction.event.StartTime),
      endTime: this.convertToAmPm(data.transaction.event.EndTime),
      location: data.transaction.event.location,
      email_cc: data.transaction.user.email != data.email ? data.email : '',
    };
    const x = await this.sendMail(payload, 'Ticket Details', 'ticket');

    //Send to Customer service
    payload.email = 'cs@zafariplus.com';
    payload.email_cc = '';
    await this.sendMail(payload, 'Ticket Sales', 'ticket');
  }

  async accountClosure(data: any) {
    const payload = {
      email: data.user.email,
      firstName: data.user.username,
      closureDate: format(new Date(), 'yyyy-MM-dd'),
    };
    await this.sendMail(
      payload,
      'Confirmation of Your Account Closure',
      'accountclosure',
    );
  }

  convertToAmPm(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
}
