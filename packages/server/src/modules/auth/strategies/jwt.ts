import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../service";
import { Request } from "express";
import { AppConfigService } from "src/config/service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly appConfigService: AppConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request.cookies.Authentication;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: appConfigService.getJwtConfig().secret,
        })
    }
    async validate(payload: any){
        const user = await this.authService.validateJwtUser(payload);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}