import {
  Body,
  Controller,
  Get,
  HttpCode,
  Injectable,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
// import { Crud, CrudController } from '@nestjsx/crud';
import { AuthService } from './service';
import RequestWithAccount from './interfaces/RequestWithAccount';
import { Response } from 'express';
import { LoginPayload, RegisterPayload } from './types';
import { Public } from './decorator';
import { LocalAuthGuard } from './guards/local';
import { JwtAuthGuard } from './guards/jwt';
// import { JwtStrategy } from "./strategies/jwt";

@Injectable()
@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithAccount, @Res() res: Response) {
    const { cookie, user: paredUser } = await this.authService.login(req.user);
    res.setHeader('Set-cookie', cookie);
    // Separate cookie to individual parts
    const parts = cookie.split(';').map((p) => p.trim());
    const authCookie = parts.find((p) => p.startsWith('Authentication='));
    const token = authCookie?.split('=')[1];
    return res.send({ ...paredUser, accessToken: token, role: 'admin' });

    // Extract different properties
    // const maxAgeStr = parts.find(p => p.startsWith("Max-Age="));
    // const sameSiteStr = parts.find(p => p.toLowerCase().startsWith("samesite"));
    // const secure = parts.includes("Secure");
    // const httpOnly = parts.includes("HttpOnly");
    // const pathStr = parts.find(p => p.startsWith("Path="));

    // const maxAge = maxAgeStr ? parseInt(maxAgeStr.split("=")[1]) * 1000 : undefined; // ms
    // console.log({maxAge})
    // const path = pathStr?.split("=")[1] || "/auth/profile";
    // const sameSite = sameSiteStr?.split("=")[1] || "Lax";

    // res.cookie("Authentication", token, {
    //     httpOnly,
    //     maxAge,
    //     sameSite: "lax",
    //     path,
    // });

    // return res.send({ ...paredUser, accessToken: token, role: "admin" });
  }

  @Get('isLoggedIn')
  isLoggedIn(@Res() res: Response) {
    return res.send(true);
  }

  @HttpCode(200)
  @Get('logout')
  logout(@Res() res: Response) {
    const emptyCookie = this.authService.getEmptyCookie();
    // console.log({ emptyCookie })
    res.setHeader('Set-cookie', emptyCookie);
    res.clearCookie('Authentication', {
      // path: '/auth/profile',
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return res.send({ success: true, message: 'Logout in successfully!!!' });
  }

  @HttpCode(200)
  @ApiBody({
    type: RegisterPayload,
  })
  @Public()
  @Post('register')
  async register(
    @Body() registerPayload: RegisterPayload,
    @Res() res: Response,
  ): Promise<any> {
    // console.log(registerPayload)
    const { cookie, user } = await this.authService.register(registerPayload);
    res.setHeader('Set-header', cookie);
    return res.send({ ...user, role: 'admin' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: RequestWithAccount, @Res() res: Response) {
    const user = req.user;
    // console.log("????",{user})
    // const account = req.user;
    // if (!user || !user.userId) {
    //     throw new UnauthorizedException('Account not found or not authenticated.');
    // }

    return res.send({ ...user, role: 'admin' });
  }
}
