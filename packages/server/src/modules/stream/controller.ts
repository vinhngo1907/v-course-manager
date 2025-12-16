import {
  Body,
  Controller,
  Injectable,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StreamService } from './service';
import { CreateTokenDto } from './dto/create-token';
import { LivekitService } from 'src/config/livekit';

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
  ) {}

  @Post('token')
  createToken(@Body() dto: CreateTokenDto) {
    console.log({ dto });
    const token = this.streamService.createToken(dto.roomName, dto.userId);
    return { token };
  }

  @Post('start-live')
  async startLive() {
    const roomName = `room_${Date.now()}`;
    await this.livekitService.createRoom(roomName);

    const token = await this.livekitService.createHostToken(
      roomName,
      'streamer',
    );
    return { roomName, token, serverUrl: this.livekitService.getServerUrl() };
  }
}
