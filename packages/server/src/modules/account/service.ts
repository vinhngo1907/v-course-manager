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
}