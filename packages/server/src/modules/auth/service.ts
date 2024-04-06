import { Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "../database/service";

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger(AuthService.name);
    constructor(
        private readonly databaseService: DatabaseService
    ) { }
}