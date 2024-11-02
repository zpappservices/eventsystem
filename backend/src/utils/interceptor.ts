import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { encrypt, decrypt } from './crypto.util';
import { Request } from 'express';
  
  @Injectable()
  export class EncryptResponseInterceptor implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<any> {
      const ctx = context.switchToHttp();
      const request: Request = ctx.getRequest<Request>();
      const exemptedRoutes = ['/public','/api/setup/decrypt-request','/api/setup/encrypt-request'];

      return next.handle().pipe(
        map(data => {
          if (exemptedRoutes.includes(request.path)) {
            return data;
          } else {
            if (data) {
              return encrypt(JSON.stringify(data));
            }
            return data;
          }
        })
      );

      //return next.handle().pipe(map(data => encrypt(JSON.stringify(data))));
    }
  }
  
  @Injectable()
  export class DecryptRequestInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const exemptedRoutes = ['/api/public/','/api/setup/decrypt-request','/api/setup/encrypt-request'];
      const request = context.switchToHttp().getRequest();
      const isExempted = exemptedRoutes.includes(request.path)
      const {payload} = request.body
      if (request.body && typeof request.body.payload === 'string' && !isExempted) {
        //request.body = JSON.parse(decrypt(request.body));
        request.body = JSON.parse(decrypt(payload));
        return next.handle();
      }
      else if(!request.body){ return next.handle(); }
      else if(isExempted){ return next.handle(); }
      throw new BadRequestException()
    }
  }
  