import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { AuthService } from "./service";
import RequestWithAccount from "./interfaces/RequestWithAccount";
import { Response } from 'express';
import { RegisterPayload } from "./types";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("/login")
    async login(@Req() req: RequestWithAccount, @Res() res: Response){
        // const { cookie, user: par}
    }

    @Post("/reigster")
    async register(@Body() registerPayload: RegisterPayload, @Res() res: Response){

    }
}
