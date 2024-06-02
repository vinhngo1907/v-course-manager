import { DatabaseService } from "@modules/database/service";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class CommentsService {

	constructor(
		private readonly databaseService: DatabaseService,
		private readonly logger: Logger,
	) {
		this.logger = new Logger(DatabaseService.name);
	}
}