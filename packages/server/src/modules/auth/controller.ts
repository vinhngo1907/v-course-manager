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
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { Crud, CrudController } from '@nestjsx/crud';
import { AuthService } from './service';
import RequestWithAccount from './interfaces/RequestWithAccount';
import { Response } from 'express';
import { LoginPayload, RegisterPayload } from './types';
import { Public } from './decorator';
import { LocalAuthGuard } from './guards/local';
import { JwtAuthGuard } from './guards/jwt';
import { createResponseSchema } from 'src/common/dtos/api-response.dto';
import { LoginResponseDto, LogoutResponseDto, RegisterResponseDto } from './dto/auth-response';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/common/decorator/swagger-response.decorator';
// import { JwtStrategy } from "./strategies/jwt";

@Injectable()
@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) { }

  // @HttpCode(200)
  @ApiSuccessResponse(LoginResponseDto)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithAccount, @Res() res: Response) {
    const { cookie, user } = await this.authService.login(req.user);
    res.setHeader('Set-cookie', cookie);
    // Separate cookie to individual parts
    const parts = cookie.split(';').map((p) => p.trim());
    const authCookie = parts.find((p) => p.startsWith('Authentication='));
    const token = authCookie?.split('=')[1];

    return res.send({
      success: true,
      message: "Login in successfully",
      data: {
        user,
        accessToken: token,
        role: 'admin'
      }
    });
  }

  @Get('isLoggedIn')
  isLoggedIn(@Res() res: Response) {
    return res.send(true);
  }

  @ApiSuccessResponse(LogoutResponseDto, {
    status: 201,
    description: 'Logout successfully',
  })
  @ApiErrorResponse({
    status: 500,
    description: 'Internal server error during logout',
  })
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

  // @HttpCode(200)
  @Public()
  @ApiBody({
    type: RegisterPayload,
  })
  @ApiOperation({
    summary: 'Complete user register',
    description:
      'Completes the registration process for the authenticated user by saving their profile information.',
  })
   @ApiSuccessResponse(RegisterResponseDto, {
    status: 201,
    description: 'Onboarding completed successfully',
  })
  @ApiErrorResponse({
    status: 400,
    description: 'Invalid request data - validation errors',
  })
  @ApiErrorResponse({
    status: 409,
    description: 'Conflict - account already registered',
  })
  @ApiErrorResponse({
    status: 500,
    description: 'Internal error',
  })
  @Post('register')
  async register(
    @Body() registerPayload: RegisterPayload,
    @Res() res: Response,
  ): Promise<RegisterResponseDto> {
    const { cookie, user } = await this.authService.register(registerPayload);
    res.setHeader('Set-header', cookie);
    // return res.send({
    //   success: true,
    //    message: "Register in successfully!",
    //   data: { user, role: 'admin' }
    // });

    return {
      success: true,
      message: 'Register completed successfully',
      data: {
        user,
      },
    };
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
