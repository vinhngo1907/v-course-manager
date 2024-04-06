import { Controller, Logger } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccountService } from "./service";

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
    constructor(
        private readonly accountService: AccountService,
        private readonly logger: Logger,
    ){}
}