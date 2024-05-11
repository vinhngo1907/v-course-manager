import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DatabaseService } from "../database/service";
import { AccountBadRequestException } from "@modules/account/exception";
import { AuthDTO } from "./dto/auth";
import { RegisterPayload } from "./types";

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger(AuthService.name);
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async login(account: any) {
        try {

        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    async register(auth: RegisterPayload): Promise<void> {

    }
}