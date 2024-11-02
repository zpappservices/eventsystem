// linkedin.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_REDIRECT_URI,
      scope: ['r_emailaddress', 'r_liteprofile']// 'r_fullprofile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    // Process user data here and save it to your database or return it for further processing
    done(null, profile);
  }
}
