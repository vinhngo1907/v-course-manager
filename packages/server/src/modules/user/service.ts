import { Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "../database/service";

@Injectable()
export class UsersService {
    private readonly logger: Logger = new Logger(UsersService.name);
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }

}