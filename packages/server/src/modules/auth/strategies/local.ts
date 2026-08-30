import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service';
import { AuthBadRequestException, AuthNotFoundException, AutUnauthorizedException } from '../exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      // throw new UnauthorizedException();
      throw new AutUnauthorizedException(username, 'N/A', 'LOGIN');
    }
    return user;
  }
}
