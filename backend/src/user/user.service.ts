import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/integrations/prisma/prisma.service';
import { VendorEventDto } from '@/event/dtos/event.dto';
import { VendorDto } from './dtos/user.dto';
import { RoleType } from '@prisma/client';

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

    
  async createVendor(data: VendorDto): Promise<any> {
    try {
      
      let vendorCreated: any;
      await this.prisma.$transaction(async (pr) => {

        vendorCreated = await this.prisma.vendor.create({
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              email: data.email,
              company: data.company,
              jobTitle: data.jobTitle,
              website: data.website,
              photo: data.photo,
              createdOn: new Date(),
              active: false,
              userId: data.userId
            },
          });

          const user = await this.prisma.user.update({
            where: { id: data.userId },
            data: {
              isVendor: true,
              role: RoleType.VENDOR
            }
          });
     
    },
    {
      maxWait: 5000, // default: 2000
      timeout: 10000, // default: 5000      
      //isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    }
  
  );
      return {
        statusCode: HttpStatus.CREATED,
        data: vendorCreated,
        message: 'Vendor created successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to create vendor.',
      };
    }
  }

      
  async updateVendor(data: VendorDto, id: string): Promise<any> {
    try {
      const created = await this.prisma.vendor.update({
        where: { id},
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          company: data.company,
          jobTitle: data.jobTitle,
          website: data.website,
          photo: data.photo,
          createdOn: new Date(),
          active: true,
          userId: data.userId
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: created,
        message: 'Vendor updated successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to update vendor.',
      };
    }
  }

  
  async getAllVendors(): Promise<any> {
    try {
      const users = await this.prisma.vendor.findMany();
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

  async getOneVendor(id: any): Promise<any> {
    try {
      const user = await this.prisma.vendor.findUnique({ where: { id: id } });

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

  async getVendorAccount(userId: any): Promise<any> {
    try {
      const account = await this.prisma.vendorAccount.findFirst({ where: { userId: userId } });

      return {
        statusCode: HttpStatus.OK,
        data: account,
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

  async getVendorByUserId(userId: any): Promise<any> {
    try {
      const user = await this.prisma.vendor.findFirst({ where: { userId: userId } });

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

  
  async verifyVendor(userId: any): Promise<any> {
    try {

      const user = await this.prisma.vendor.findFirst({ where: { userId: userId } });

      const account = await this.prisma.vendorAccount.findFirst({ where: { userId: userId } });

      if(!user || !account){
        return {
          statusCode: HttpStatus.OK,
          data: null,
          message: 'Onboarding or account information not completed',
        };
      }

      const update = await this.prisma.vendor.update({ 
        where: { id: user.id },
        data: {
          active: true
        }

      });
      return {
        statusCode: HttpStatus.OK,
        data: user,
        message: 'Vendor Verified',
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
}
