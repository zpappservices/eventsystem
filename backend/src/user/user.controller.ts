import { Controller, Get, UseGuards, Param, Body, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '@/auth/guards/firebase.guard';
import { GetCareerDto, UserSessionDto } from './dtos/user-session.dto';
import { query } from 'express';
import { WaitingListDto } from './dtos/createUser.dto';


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
 
}
