import { JwtAuthGuard } from '@modules/auth/guards/jwt';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentReactionsService } from './service';

@Controller({
  path: 'comment-reactions',
  version: '1',
})
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Comment Reactions')
export class CommentReactionsController {
  constructor(
    private readonly commentReactionsService: CommentReactionsService,
  ) {}
}
