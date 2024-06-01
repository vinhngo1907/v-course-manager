import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { AuthService } from "../auth/service";
import { DatabaseService } from "../database/service";
import { AccountDTO, IAccount } from "./dto/account";
import { mapAccountToAccountDTO } from "./mapper";
import { AccountUpdationDTO } from "./dto/account-updation.dto";
import { AccountBadRequestException } from "./exception";

@Injectable()
export class AccountsService {
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

            return mapAccountToAccountDTO(account);

        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    // Get all accounts are activated
    async findAll(): Promise<AccountDTO[]> {
        try {
            const accounts = await this.databaseService.account.findMany({
                where: {
                    isActivated: true
                },
                include: {
                    user: {
                        include: {
                            roles: true
                        }
                    }
                }
            });

            return accounts.map(mapAccountToAccountDTO);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async update(accountId: string, updateAccountDto: AccountUpdationDTO): Promise<AccountDTO> {
        try {
            if (!accountId) {
                throw new NotFoundException(`Account with id ${accountId} is not found`);
            }

            const updatedAccount = await this.databaseService.account.update({
                where: {
                    id: accountId
                },
                data: {
                    ...updateAccountDto
                }
            });

            return mapAccountToAccountDTO(updatedAccount);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async checkUsernameExisted(username: string): Promise<void> {
        try {
            const existedAccount = await this.databaseService.account.findUnique({
                where: {
                    username: username
                }
            });

            if (existedAccount) {
                throw new AccountBadRequestException('Username is existed');
            }
        } catch (error) {
            this.logger.error(error);
            throw new AccountBadRequestException('Username is existed');
        }
    }
    async remove(accountId: string): Promise<boolean> {
        const result = await this.databaseService.account.delete({
            where: {
                id: accountId
            }
        });
        return result !== null;
    }
}