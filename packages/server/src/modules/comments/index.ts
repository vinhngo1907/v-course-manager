import { Global, Logger, Module } from "@nestjs/common";
import { CommentsService } from "./service";
import { DatabaseService } from "@modules/database/service";
import { CommentsController } from "./controller";

@Global()
@Module({
	providers: [CommentsService, DatabaseService, Logger],
	controllers: [CommentsController]
})
export class CommentsModule { }
