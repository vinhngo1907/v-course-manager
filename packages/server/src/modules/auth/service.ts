import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DatabaseService } from "../database/service";
import { AccountBadRequestException } from "@modules/account/exception";
import { AuthDTO } from "./dto/auth";
import { RegisterPayload, TokenPayload } from "./types";
import { hashPassword } from "./utils";
import { UsersService } from "@modules/user/service";
import { AccountsService } from "@modules/account/service";
import { Prisma, } from '@prisma/client';
import { AppConfigService } from "src/config/service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger(AuthService.name);
    private readonly appConfigService: AppConfigService = new AppConfigService(new ConfigService());
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly accountsService: AccountsService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(account: any) {
        try {
            const {
                username,
                user: { id, email, fullName },
            } = account;
            const cookie = this.getCookieWithJwtToken(username, id);
            return {
                cookie,
                user: {
                    id,
                    email,
                    username,
                    fullName
                }
            }
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    async register({
        username,
        email,
        fullName,
        password: rawPass,
    }: RegisterPayload): Promise<any> {
        try {
            const hashedPassword = await hashPassword(rawPass);
            const userRole = await this.databaseService.role.findFirstOrThrow({
                where: {
                    name: "USER"
                }
            });

            await this.accountsService.checkUsernameExisted(username);
            await this.usersService.checkEmailExisted(email);
            return await this.databaseService.$transaction(async (manager) => {
                const createdUser = await this.usersService.createUserTransaction(
                    manager as any,
                    username,
                    hashedPassword,
                    email,
                    fullName,
                    [userRole],
                )

                return this.login({
                    username,
                    user: {
                        userId: createdUser.id,
                        email,
                        fullName,
                    },
                });
            });
        } catch (error) {
            this.logger.error(`${error.message}`);
            throw new InternalServerErrorException(error.message);
        }
    }

    getCookieWithJwtToken(username: string, userId: string) {
        const payload: TokenPayload = { username, userId };
        const token = this.jwtService.sign(payload);
        const {
            signOptions: { expiresIn },
        } = this.appConfigService.getJwtConfig();
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn};SameSite=None; Secure`;
    }

    getEmptyCookie() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0;SameSite=None; Secure`;
    }
}