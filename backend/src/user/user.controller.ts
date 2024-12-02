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

  @Post('/create-vendor')
  async createVendor(@Body() dto: VendorDto): Promise<any> {
    return await this.userService.createVendor(dto);
  }
  @Post('/update-vendor/:id')
  async updateVendor(@Body() dto: VendorDto, @Param() id: string): Promise<any> {
    return await this.userService.updateVendor(dto, id);
  }
  @Get('/getonevendor/:id')
  async getOneVendor(@Param('id') id: any): Promise<any> {
    return this.userService.getOneVendor(id);
  }
  @Get('/getvendorbyuserid/:userid')
  async getVendorBy(@Param('userid') id: any): Promise<any> {
    return this.userService.getOneVendor(id);
  }
  @Get('/get-vendor-account/:userid')
  async getVendorAccount(@Param() userid: string): Promise<any> {
    return this.userService.getVendorAccount(userid);
  }
  @Get('/getallvendor')
  async getAllVendor(): Promise<any> {
    return this.userService.getAllVendors();
  }
 
}
