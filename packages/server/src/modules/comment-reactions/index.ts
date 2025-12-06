import { Module } from '@nestjs/common';
import { CommentReactionsController } from './controller';
import { CommentReactionsService } from './service';

@Module({
  controllers: [CommentReactionsController],
  providers: [CommentReactionsService],
})
export class CommentReactionsModule {}
