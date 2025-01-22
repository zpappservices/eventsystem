import { Controller, Get, UseGuards, Param, Body, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '@/auth/guards/firebase.guard';
import { query } from 'express';
import { VendorDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getalluser')
  async getAllUsers(): Promise<any> {
    return await this.userService.getAllUsers();
  }

  //@UseGuards(FirebaseAuthGuard)
  @Get('/getoneuser/:id')
  async getOneUser(@Param('id') id: any): Promise<any> {
    const user = await this.userService.getOneUser(id);
    return user;
  }
  @Get('/get-user-by-email')
  async getUserByEmail(@Query('email') email: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }

  @Post('/create-vendor')
  async createVendor(@Body() dto: VendorDto): Promise<any> {
    return await this.userService.createVendor(dto);
  }
  @Post('/update-vendor/:Id')
  async updateVendor(@Body() dto: VendorDto, @Param('Id') Id: string): Promise<any> {
    return await this.userService.updateVendor(dto, Id);
  } 
  @Get('/getonevendor/:Id')
  async getOneVendor(@Param('Id') Id: any): Promise<any> {
    return this.userService.getOneVendor(Id);
  }
  @Get('/getvendorbyuserid/:userId')
  async getVendorBy(@Param('userId') userId: any): Promise<any> {
    return this.userService.getOneVendor(userId);
  }
  @Get('/get-vendor-account/:userId')
  async getVendorAccount(@Param('userId') userId: string): Promise<any> {
    return this.userService.getVendorAccount(userId);
  }
  @Get('/getallvendor')
  async getAllVendor(): Promise<any> {
    return this.userService.getAllVendors();
  }
  @Get('/verify-vendor/:userId')
  async verifyVendor(@Param('userId') userId: string): Promise<any> {
    return this.userService.verifyVendor(userId);
  }
 
}
