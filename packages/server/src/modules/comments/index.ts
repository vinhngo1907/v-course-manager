import { Module } from "@nestjs/common";
import { CommentsService } from "./service";
import { DatabaseService } from "@modules/database/service";
import { CommentsController } from "./controller";

@Module({
	providers: [CommentsService, DatabaseService],
	controllers: [CommentsController]
})
export class CommentsModule { }
