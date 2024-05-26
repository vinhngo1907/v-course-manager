import { Body, Controller, Get, HttpCode, Post, Req, Res } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { AuthService } from "./service";
import RequestWithAccount from "./interfaces/RequestWithAccount";
import { Response } from 'express';
import { RegisterPayload } from "./types";
import { Public } from "./decorator";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("login")
    async login(@Req() req: RequestWithAccount, @Res() res: Response) {
        // const { cookie, user: par}
    }

    @Get("isLoggedIn")
    isLoggedIn(@Res() res: Response) {
        return res.send(true);
    }
    
    @HttpCode(200)
    @Get('logout')
    logout(@Res() res: Response) {
        const emptyCookie = this.authService.getEmptyCookie();
        res.setHeader('Set-cookie', emptyCookie);
        return res.send();
    }

    @HttpCode(200)
    @ApiBody({
        type: RegisterPayload,
    })
    @Public()
    @Post("reigster")
    async register(@Body() registerPayload: RegisterPayload, @Res() res: Response) {
        const {cookie, user} = await this.authService.register(registerPayload);
    }
}
