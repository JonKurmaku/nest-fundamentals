import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { authConstant } from "src/common/constants/authConstant";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy){
    constructor(private authtService: AuthService){
        super()
    }   

    async validate(apiKey: string){
        const user = await this.authtService.validateByApiKey(apiKey)
        if(!user){
            throw new UnauthorizedException()
        }else{
            return user
        }
    }
}