import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class GoogleAuthService {
  private oauth2Client: any;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      this.configService.get('gmail.clientId'),
      this.configService.get('gmail.clientSecret'),
      this.configService.get('gmail.redirectMailUri'),
    );
  }

  async getGmailService(auth: any) {
    const gmail = google.gmail({ version: 'v1', auth });
    return gmail;
  }
  async getCalendarService(auth: any) {
    const calendar = google.calendar({ version: 'v3', auth });
    return calendar;
  }

  async getProfile(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    const gmail = google.oauth2({ version: 'v2', auth: this.oauth2Client });
    const profile = await gmail.userinfo.get();
    return {profile:profile.data, tokens};
  }

  getAuthUrl(email?: string) {
    const scopes = [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/meetings.space.created',
      'https://www.googleapis.com/auth/meetings.space.readonly',
      'profile'
    ];
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      state: email
    });
  }

  async getAuthService(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
     return this.oauth2Client.setCredentials(tokens);

  }

}
