import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/integrations/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: any): Promise<any> {
    try {
      const created = await this.prisma.user.create({
        data: user,
      });

      return created;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Operation fail to create user');
    }
  }

  async getAllUsers(): Promise<any> {
    try {
      const users = await this.prisma.user.findMany();
      return {
        statusCode: HttpStatus.OK,
        data: users,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
        message: `Fail`,
      };
    }
  }

  async getOneUser(id: any): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: id } });

      return {
        statusCode: HttpStatus.OK,
        data: user,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
        message: `Fail`,
      };
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

}
