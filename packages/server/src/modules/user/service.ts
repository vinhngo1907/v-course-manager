import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DatabaseService } from "../database/service";
import { UserBadRequestException } from "./exception";
import { Role, User, Account } from "@prisma/client";
import { EntityManager } from 'typeorm';
@Injectable()
export class UsersService {
    private readonly logger: Logger = new Logger(UsersService.name);
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }
    async checkEmailExisted(email: string): Promise<void> {
        try {
            const existedEmail = await this.databaseService.user.findUnique({
                where: {
                    email: email
                }
            });
            if (existedEmail) {

                throw new UserBadRequestException("Email is existed!");
            }

        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    async createUserTransaction(
        manager: any,
        username: string,
        email: string,
        hashedPassword: string,
        fullName: string,
        userRole: Role[]
    ): Promise<User> {
        const newAccount = await this.databaseService.account.create({
            data: {
                username, password: hashedPassword
            }
        });
        this.logger.verbose(newAccount);
        await manager.save(newAccount);
        const newUser = await this.databaseService.user.create({
            data: {
                email,
                fullName,
                account: {
                    connect: { id: newAccount.id }
                },
                roles: {
                    connect: userRole.map((role) => ({ id: role.id }))
                },
            }
        });

        this.logger.verbose(newUser);
        const createdUser = await manager.save(newUser);
        this.logger.verbose(createdUser.id);
        return createdUser;
    }
}