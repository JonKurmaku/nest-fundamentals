import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadType } from "src/artists/types";
import { authConstant } from "../../common/constants/authConstant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConstant.secret,
        })
    }

    async validate(payload: PayloadType){
        return { 
        userId: payload.userId,
        email: payload.email,
        artistId: payload.artistId, }
    }
}