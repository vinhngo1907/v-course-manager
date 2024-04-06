import { Global, Logger, Module } from "@nestjs/common";
import { AuthService } from "./service";
import { DatabaseService } from "../database/service";
import { AuthController } from "./controller";
@Global()
@Module({
    providers:[DatabaseService,Logger],
    exports: [AuthService],
    controllers:[AuthController],

})

export class AuthModule { }