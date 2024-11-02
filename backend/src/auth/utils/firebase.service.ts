import * as admin from 'firebase-admin';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {

  private static firebaseApp: admin.app.App;
    
  constructor(private configService: ConfigService) {
    
    if (!FirebaseService.firebaseApp) {
      FirebaseService.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get('FIREBASE_PROJECT_ID'),
          clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
          privateKey: this.configService.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
        }),
        databaseURL: this.configService.get('FIREBASE_DATABASE_URL'),
      });
    } 
    
  }

  getFirebaseApp(): admin.app.App {
    return FirebaseService.firebaseApp;
  }

  async verifyToken(token: string) {
    try {
      return await FirebaseService.firebaseApp.auth().verifyIdToken(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async signup(email: string, password: string) {
    try {
      const user = await this.getFirebaseApp().auth().createUser({
        email,
        password,
      });
      return {
        message: 'User created successfully',
        data: user,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.log(`Error creating user: ${error.message}`);
      return {
        message: 'Error creating user',
        data: null,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
      
    }
  }

  async updateEmailVerifiedStatus(uid: string, isEmailVerified: boolean) {
    try {
      const userRecord = await this.getFirebaseApp().auth().updateUser(uid, {
        emailVerified: isEmailVerified,
      });
      return {
        message: 'Email verification status updated successfully',
        data: { uid: userRecord.uid, emailVerified: userRecord.emailVerified },        
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new Error(`Error updating email verification status: ${error.message}`);
    }
  }
}
