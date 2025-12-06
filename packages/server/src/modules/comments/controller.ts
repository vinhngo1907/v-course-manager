import { JwtAuthGuard } from '@modules/auth/guards/jwt';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './service';
import RequestWithAccount from '@modules/auth/interfaces/RequestWithAccount';
import { CrudRequest } from '@nestjsx/crud';
import { CommentCreationDTO } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(public readonly commentsService: CommentsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(
    @Query('videoId') videoId: string,
    @Query('sort') sort: string,
    req: CrudRequest,
  ) {
    if (videoId) {
      return this.commentsService.findAllByVideoId(videoId, sort);
    }
    return await this.commentsService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addComment(
    @Body() dto: CommentCreationDTO,
    @Req() req: RequestWithAccount,
  ) {
    const account = req.user;
    return this.commentsService.addComment(dto, account.id);
  }
}
