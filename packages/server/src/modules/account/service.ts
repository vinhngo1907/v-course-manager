import { Injectable, Logger } from "@nestjs/common";
import { AuthService } from "../auth/service";
import { DatabaseService } from "../database/service";

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
    async findById(id: string) {
        return this.databaseService.account.findFirst({
            where: { id },
            include: {user: true}
        })
    }
}