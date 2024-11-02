import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "@/user/user.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService){
        super();
    }
    serializeUser(user: any, done: Function) {
        done(null, user);
    }
    async deserializeUser(payload: any, done: Function) {
        const user = await this.userService.
            getOneUser(payload.id)
        return user ? done(null, user) : done(null, null)
    }
    
}