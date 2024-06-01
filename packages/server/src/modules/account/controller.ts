import { Body, Controller, Delete, Get, Logger, Param, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccountsService } from "./service";
import { AccountDTO } from "./dto/account";
import { AccountUpdationDTO } from "./dto/account-updation.dto";

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
    constructor(
        private readonly accountsService: AccountsService,
        private readonly logger: Logger,
    ) { }

    @Get("/:id")
    async findById(@Param('id') id: string): Promise<AccountDTO> {
        return this.accountsService.findById(id);
    }

    @Get()
    async getAll(): Promise<AccountDTO[]> {
        return await this.accountsService.findAll();
    }

    // Update Account by Id
    @Patch("/:id")
    async update(@Param("id") accountId: string, @Body() accountUpdateDto: AccountUpdationDTO) {
        return await this.accountsService.update(accountId, accountUpdateDto);
    }

    // Delete Account by Id
    @Delete("/:id")
    async remove(@Param("id") accountId: string): Promise<boolean> {
        return await this.accountsService.remove(accountId);
    }
}