import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignupDto, SingleSignonDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { Request, Response } from 'express';
import { FirebaseAuthGuard } from './guards/firebase.guard';
import { ActivateAccountDto } from './dtos/email.dto';
import { AuthGuard } from '@nestjs/passport';
import { LinkedInAuthGuard } from './guards/linkedln.guard';


@Controller('auth')
//@UseGuards(FirebaseAuthGuard)
export class AuthController {
  constructor(private authService: AuthService
  ) {}

  
  @Post('/signup')
  async signup(
    @Body() signupDto: SignupDto,
    @Req() req: Request,
  ): Promise<void> {
    const user = await this.authService.signup(signupDto, req);
    return user;
  }
    
  @Post('/singlesignon')
  async singlesignon(
    @Body() dto: SingleSignonDto,
  ): Promise<void> {
    const user = await this.authService.singleSignOn(dto);
    return user;
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('/login')
  async signin(@Body() loginDto: SigninDto): Promise<void> {
    const user = await this.authService.signin(loginDto);
    return user;
  }

  @Post('/verify-email')
  async verifyEmail(
    @Body() activateAccountDto: ActivateAccountDto
  ): Promise<any> {
     return this.authService.activateAccount(activateAccountDto);
  }
  
  @Get('/resend-otp')
  async resendOtp(
    @Query('email') email: string
  ): Promise<any> {
     return this.authService.resendOtp(email);
  }

  @Get('linkedin')
  @UseGuards(LinkedInAuthGuard)
  linkedinLogin() {
    // This will initiate the LinkedIn authentication process
  }

  @Get('linkedin/callback')
  @UseGuards(LinkedInAuthGuard)
  linkedinCallback(@Req() req) {
    // LinkedIn redirects here after successful authentication
    const user = req.user;
    return user;
  }
}
