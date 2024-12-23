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
import { AccountClosure, IsLoginDto, SigninDto } from './dtos/signin.dto';
import { Request, Response } from 'express';
import { FirebaseAuthGuard } from './guards/firebase.guard';
import { ActivateAccountDto } from './dtos/email.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
//@UseGuards(FirebaseAuthGuard)
export class AuthController {
  constructor(private authService: AuthService
  ) {}

  
  @Post('/signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ description: 'Payload to signup a user', type: SignupDto })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
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

  //@UseGuards(FirebaseAuthGuard)
  @Post('/login')
  async signin(@Body() loginDto: SigninDto): Promise<void> {
    const user = await this.authService.signin(loginDto);
    return user;
  }

  @Post('/verify-email')
  @ApiOperation({ summary: 'Verify email' })
  @ApiBody({ description: 'Payload to verify email', type: ActivateAccountDto })
  @ApiResponse({ status: 200, description: 'Account activated successfully.' })
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
  //@UseGuards(FirebaseAuthGuard)
  @Post('/islogin')
  async isLogin(@Body() req: IsLoginDto): Promise<void> {
    return await this.authService.isLogin(req);

  }
  @Post('/signout')
  async signOut(@Body('userId') userId: string) {
    return this.authService.signOut(userId);
  }
  @Post('/forgotpassword')
  async forgotpassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('/close-user-account')
  @ApiOperation({ summary: 'Close User Account a new user' })

  async closeUserAccount(@Body() dto: AccountClosure) {
    return this.authService.closeUserAccount(dto.userId);
  }
}
