import { Global, Logger, Module } from "@nestjs/common";
import { AuthService } from "./service";
import { DatabaseService } from "../database/service";
import { AuthController } from "./controller";
import { AccountsService } from "@modules/account/service";
import { UsersService } from "@modules/user/service";
import { AppConfigService } from "src/config/service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Global()
@Module({
    providers: [
        DatabaseService, Logger,
        AuthService, AccountsService,
        UsersService,
        AppConfigService,
        JwtService,
        ConfigService
    ],
    exports: [AuthService],
    controllers: [AuthController],

})

export class AuthModule { }