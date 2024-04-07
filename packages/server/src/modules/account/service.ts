import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { AuthService } from "../auth/service";
import { DatabaseService } from "../database/service";
import { AccountDTO, IAccount } from "./dto/account";
import { mappAccountToAccountDTO } from "./mapper";

@Injectable()
export class AccountService {
    // private readonly logger: Logger = new Logger(AuthService.name);
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: Logger,
    ) { }

    async findOne(username: string) {
        return this.databaseService.account.findFirst({
            where: {
                username,
                isActivated: true
            },
            include: { user: true }
        });
    }

    // Find Account by Id
    async findById(id: string): Promise<AccountDTO> {
        try {
            const account = await this.databaseService.account.findFirst({ 
                where: { id },
            });
            if (!account) {
                throw new NotFoundException(`Account with id ${id} is not found`);
            }

            return mappAccountToAccountDTO(account)

        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }
}