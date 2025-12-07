import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfigService } from 'src/config/service';
import { Request } from 'express';
import { AuthService } from '../service';
// import { ConfigService } from '@nestjs/config';


export interface JwtPayload {
  sub: string;
  email: string;
  username: string;
  roles: string[];
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly appConfig: AppConfigService,
    // private readonly configService: ConfigService,
  ) {
    // const secret = configService.get<string>('AUTH_SERVICE_JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // console.log("[CHECK COOKIE]", request.cookies)
          // console.log('[COOKIE KEYS]', Object.keys(request.cookies));
          return request.cookies.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: `${appConfig.getJwtConfig().secret}`,
    });
  }
  async validate(payload: any) {
    const user = await this.authService.validateJwtUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
