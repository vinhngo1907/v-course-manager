import { Global, Logger, Module } from "@nestjs/common";
import { AccountController } from "./controller";
import { AccountService } from "./service";
import { DatabaseService } from "../database/service";

@Global()
@Module({
    providers: [DatabaseService, AccountService, Logger],
    controllers: [AccountController],
    exports: [AccountService]
})

export class AccountModule { }