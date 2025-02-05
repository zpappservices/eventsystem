import { HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto, SingleSignonDto } from './dtos/signup.dto';
import { IsLoginDto, SigninDto } from './dtos/signin.dto';
import { UserService } from '@/user/user.service';
import { Request } from 'express';
import { PrismaService } from '@/integrations/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from './utils/firebase.service';
import { Utility } from './utils/auth.utility';
import { EmailerService } from '@/integrations/email/emailer.service';
import { ActivateAccountDto } from './dtos/email.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private emailService: EmailerService,
    private configService: ConfigService,
    private firebaseService: FirebaseService,
  ) {}

  async signup(user: SignupDto, req: Request): Promise<any> {
    try {
      const { email, password } = user;

      const existingUser = await this.userService.getUserByEmail(email);

      if (existingUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'Email is already taken.',
        };
      }

      const firebaseUser = await this.firebaseService.signup(email, password);

      if (firebaseUser.statusCode != HttpStatus.OK) {
        return firebaseUser;
      }

      // Activation Token
      var otp = (await Utility.generateRandomNumber(6)).toString();

      let expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + 10 * 60 * 1000);

      const userDto = {
        accountId: firebaseUser.data.uid,
        isVerified: firebaseUser.data.emailVerified,
        username: firebaseUser.data.email.split('@')[0],
        email: firebaseUser.data.email,
        provider: 'password',
        passwordResetToken: await Utility.createHashToken(otp),
        passwordResetExpires: expiryDate,
      };

      const created = await this.userService.create(userDto);

      if (!created) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'Error creating user.',
        };
      }

      try {
        await this.emailService.sendActivateAccount({ user: created, otp });
      } catch (e) {
        console.log(e.message);
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: created,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to register a new user!',
      };
    }
  }

  async signin(user: SigninDto): Promise<any> {
    try {
      const { email, password } = user;

      const existingUser = await this.userService.getUserByEmail(email);

      if (!existingUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: null,
          message: `Invalid credentials!`,
        };
      }

      if (!existingUser.isVerified) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: null,
          message: `Account Inactive!`,
        };
      }

      if (existingUser.isVendor) {
        const vendor = await this.userService.getVendorByUserId(
          existingUser.id,
        );

        if (!vendor) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            data: null,
            message: `Vendor has not been onboarded!`,
          };
        }
        if (!vendor.data.active) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            data: null,
            message: `Vendor Account Pending Verification!`,
          };
        }
      }

      await this.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          isOnline: true,
          lastLogin: new Date(),
        },
      });

      return {
        statusCode: HttpStatus.OK,
        data: { existingUser },
        message: 'Success!',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: `SignIn failure!`,
      };
    }
  }

  async singleSignOn(dto: SingleSignonDto): Promise<any> {
    try {
      const { email, provider, displayName, uid } = dto;

      const existingUser = await this.userService.getUserByEmail(email);

      if (existingUser) {
        // update login
        await this.prisma.user.update({
          where: { id: existingUser.id },
          data: {
            isOnline: true,
            lastLogin: new Date(),
          },
        });

        return {
          statusCode: HttpStatus.OK,
          data: { existingUser },
          message: 'Success!',
        };
      }

      const userDto = {
        accountId: uid,
        isVerified: true,
        username: email.split('@')[0],
        email: email,
        provider: provider,
      };

      const created = await this.userService.create(userDto);

      if (!created) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'Error creating user.',
        };
      }

      await this.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          isOnline: true,
          lastLogin: new Date(),
        },
      });

      try {
        await this.emailService.sendWelcome({ user: created });
      } catch (e) {
        console.log(e.message);
      }

      return {
        statusCode: HttpStatus.OK,
        data: { existingUser },
        message: 'Success!',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: `SignIn failure!`,
      };
    }
  }

  async emailExist(email: string): Promise<any> {
    try {
      const existingUser = await this.userService.getUserByEmail(email);

      if (!existingUser) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: false,
          message: `User not found.`,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        data: true,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: null,
        message: `Error reseting password!`,
      };
    }
  }

  async activateAccount(dto: ActivateAccountDto): Promise<any> {
    try {
      const { email, otp } = dto;

      const existingUser = await this.userService.getUserByEmail(email);

      if (!existingUser) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: false,
          message: `User not found.`,
        };
      }

      const hashed = await Utility.createHashToken(otp);

      if (hashed != existingUser.passwordResetToken) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: false,
          message: `Token mismatch`,
        };
      }

      let expiryDate = new Date();

      if (expiryDate > existingUser.passwordResetExpires) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: false,
          message: `Token Expire`,
        };
      }

      const user = await this.prisma.user.update({
        where: { id: existingUser.id },
        data: { isVerified: true },
      });

      return {
        statusCode: HttpStatus.OK,
        data: true,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: false,
        message: `Error verifying email!`,
      };
    }
  }

  async resendOtp(email: string): Promise<any> {
    try {
      const existingUser = await this.userService.getUserByEmail(email);

      if (!existingUser) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: false,
          message: `User not found.`,
        };
      }

      // Activation Token
      var otp = (await Utility.generateRandomNumber(6)).toString();

      let expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + 10 * 60 * 1000);

      const user = await this.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          passwordResetToken: await Utility.createHashToken(otp),
          passwordResetExpires: expiryDate,
        },
      });

      try {
        await this.emailService.sendActivateAccount({ user, otp });
      } catch (e) {
        console.log(e.message);
      }

      return {
        statusCode: HttpStatus.OK,
        data: true,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: false,
        message: `Error verifying email!`,
      };
    }
  }

  async isLogin(dto: IsLoginDto): Promise<any> {
    try {
      const { token, userId } = dto;

      const isverify = await this.firebaseService.verifyToken(token);

      if (!isverify) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          data: false,
          message: `UnAuthorize User.`,
        };
      }
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          data: false,
          message: `Invalid User.`,
        };
      }

      if (isverify.uid != user.accountId) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          data: false,
          message: `Invalid User.`,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        data: true,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: false,
        message: `Operation fail!`,
      };
    }
  }

  async signOut(userId: string): Promise<any> {
    try {
      const existingUser = await this.userService.getOneUser(userId);

      if (!existingUser) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: false,
          message: `User not found.`,
        };
      }

      const firebaseResponse = await this.firebaseService.signout(
        existingUser.data.accountId,
      );

      if (!firebaseResponse) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: false,
          message: `Signout Fail`,
        };
      }

      const user = await this.prisma.user.update({
        where: { id: existingUser.data.id },
        data: {
          isOnline: false,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        data: true,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: false,
        message: `Operation fail!`,
      };
    }
  }

  async forgotPassword(email: string): Promise<any> {
    try {
      const existingUser = await this.userService.getUserByEmail(email);

      if (!existingUser) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: false,
          message: `User not found.`,
        };
      }

      const resetLink = await this.firebaseService.sendPasswordResetEmail(
        email,
      );

      if (!resetLink) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: false,
          message: `Password link`,
        };
      }

      try {
        await this.emailService.sendPasswordReset({
          user: existingUser,
          link: resetLink,
        });
      } catch (e) {
        console.log(e.message);
      }

      return {
        statusCode: HttpStatus.OK,
        data: true,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: false,
        message: `Operation fail!`,
      };
    }
  }

  async closeUserAccount(userId: string): Promise<any> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: false,
          message: `User not found.`,
        };
      }

      const deleteFirebaseUser = await this.firebaseService.deleteUser(
        existingUser.accountId,
      );

      // if(!deleteFirebaseUser) {
      //   return {
      //     statusCode: HttpStatus.BAD_REQUEST,
      //     data: false,
      //     message: `Unable to delete User`,
      //   };
      // }
      console.log(`User with id ${userId} deleted from firebase`);

      const vendor = await this.prisma.vendor.findFirst({
        where: { userId: userId },
      });

      if (vendor) {
        await this.prisma.vendor.delete({ where: { id: vendor.id } });
        await this.prisma.vendorAccount.delete({
          where: { userId: vendor.userId },
        });
      }

      await this.prisma.user.delete({ where: { id: userId } });

      try {
        await this.emailService.accountClosure({ user: existingUser });
      } catch (e) {
        console.log(e.message);
      }

      return {
        statusCode: HttpStatus.OK,
        data: true,
        message: 'User Deleted',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: false,
        message: `Operation fail!`,
      };
    }
  }
}
