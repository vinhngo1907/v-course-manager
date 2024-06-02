import { Global, Logger, Module } from "@nestjs/common";
import { AuthService } from "./service";
import { DatabaseService } from "../database/service";
import { AuthController } from "./controller";
import { AccountsService } from "@modules/account/service";
import { UsersService } from "@modules/user/service";
import { AppConfigService } from "src/config/service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "@modules/user";
import { AccountModule } from "@modules/account";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./guards/role";
import { LocalStrategy } from './strategies/local';
import { JwtStrategy } from "./strategies/jwt";
@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (appConfig: AppConfigService) => appConfig.getJwtConfig(),
            inject: [AppConfigService],
        }),
        // JwtModule.register(new AppConfigService(new ConfigService).getJwtConfig()),
    ],
    controllers: [AuthController],
    providers: [
        DatabaseService,
        AuthService,
        AccountsService,
        UsersService,
        AppConfigService,
        ConfigService,
        Logger,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ],
    exports: [AuthService, JwtModule],

})

export class AuthModule { }