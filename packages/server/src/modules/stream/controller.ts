import {
  Body,
  Controller,
  Injectable,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { StreamService } from './service';
import { CreateTokenDto } from './dto/create-token';
import { LivekitService } from 'src/config/livekit';
import RequestWithAccount from '@modules/auth/interfaces/RequestWithAccount';
import { JwtAuthGuard } from '@modules/auth/guards/jwt';
// import { CreateStreamDto } from './dto/create-stream';

@Injectable()
@ApiTags('stream')
@Controller({
  path: 'stream',
  version: '1',
})
export class StreamController {
  constructor(
    private readonly streamService: StreamService,
    private readonly livekitService: LivekitService,
    private readonly logger: Logger,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('token')
  @ApiOperation({
    summary: 'Complete create token',
    description:
      'Completes the token process for Viewer join room',
  })
  //  @ApiErrorResponse({
  //     status: 400,
  //     description: 'Invalid request data - validation errors or invalid goal IDs',
  //   })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized - valid authentication token required',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error during create stream token',
  })
  createToken(@Req() req: RequestWithAccount, @Body() dto: CreateTokenDto) {
    const user = req.user;
    // const token = this.streamService.createToken(dto.roomName, dto.userId);
    // return { token };
    return this.streamService.createLivekitToken({
      roomName: dto.roomName,
      userId: user.id,
      isHost: false,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Post('start-live')
  @ApiOperation({
    summary: 'Complete start live',
    description:
      'Completes the livestream process for Streamer',
  })
  //  @ApiErrorResponse({
  //     status: 400,
  //     description: 'Invalid request data - validation errors or invalid goal IDs',
  //   })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized - valid authentication token required',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error during start livestream',
  })
  async startLive(@Req() req: RequestWithAccount, dto: {}) {
    const roomName = `room_${Date.now()}`;
    const user = req.user;
    // return this.streamService.startLiveStream({
    //   // roomName,
    //   // isHost: true,
    //   ...dto,
    //   userId: user.id,
    // })
  }
}
