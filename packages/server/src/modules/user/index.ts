import { Global, Logger, Module } from "@nestjs/common";
import { UsersController } from "./controller";
import { UsersService } from "./service";
import { DatabaseService } from "../database/service";

@Global()
@Module({
    providers: [DatabaseService, UsersService, Logger],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UserModule { }