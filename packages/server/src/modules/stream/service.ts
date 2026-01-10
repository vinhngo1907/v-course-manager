import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '@modules/database/service';
import { VideoService } from '@modules/video/service';
import { AccessToken } from 'livekit-server-sdk';
import { AppConfigService } from 'src/config/service';
import { LivekitService } from 'src/config/livekit';
import { StartLiveStreamDto } from './dto/livestream';
// import { CreateStreamDto } from './dto/create-stream';

@Injectable()
export class StreamService {
  private readonly logger: Logger = new Logger(StreamService.name);
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly videoService: VideoService,
    private readonly appConfigService: AppConfigService,
    private readonly livekitService: LivekitService
  ) { }
  /**
   * Generate Token for joining a room
   */
  createToken(roomName: string, userId: string) {
    const cfg = this.appConfigService.getLivekitConfig();
    const token = new AccessToken(cfg.apiKey, cfg.apiSecret, {
      identity: userId,
    });

    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });

    return { token, serverUrl: cfg.host };
  }

  createLivekitToken({
    roomName,
    userId,
    isHost = false,
  }: {
    roomName: string;
    userId: string;
    isHost?: boolean;
  }) {
    const cfg = this.appConfigService.getLivekitConfig();

    const token = new AccessToken(cfg.apiKey, cfg.apiSecret, {
      identity: userId,
    });

    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: isHost,
      canSubscribe: true,
    });

    return {
      token: token.toJwt(),
      serverUrl: cfg.host,
    };
  }

  // async handleRecordingFinished(payload: any) {
  //   const roomName = payload.room?.name;
  //   const file = payload.file;

  //   if (!roomName || !file?.url) return;

  //   const stream = await this.databaseService.stream.findFirst({
  //     where: { ingressId: roomName },
  //   });

  //   if (!stream) return;

  //   const video = await this.databaseService.video.create({
  //     data: {
  //       title: stream.title,
  //       description: stream.description ?? '',
  //       videoUrl: file.url,
  //       duration: file.duration ?? 0,
  //       ownerId: stream.userId,
  //       status: 'ready',
  //     },
  //   });

  //   await this.databaseService.stream.update({
  //     where: { id: stream.id },
  //     data: {
  //       recordedVideoId: video.id,
  //     },
  //   });
  // }

  // async handleRoomEnded(payload: any) {
  //   const roomName = payload.room?.name;
  //   if (!roomName) return;

  //   await this.databaseService.stream.updateMany({
  //     where: { ingressId: roomName },
  //     data: {
  //       status: 'ENDED',
  //       isLive: false,
  //       endedAt: new Date(),
  //     },
  //   });
  // }
  // async startLiveStream({
  //   title,
  //   type,
  //   sourceVideoId,
  //   courseId,
  //   userId,
  // }: CreateStreamDto & { userId: string }) {
  //   const roomName = `room_${Date.now()}`;

  //   // 1. Validate VIDEO source
  //   if (type === 'VIDEO') {
  //     if (!sourceVideoId) {
  //       throw new BadRequestException('sourceVideoId is required');
  //     }

  //     const video = await this.databaseService.video.findFirst({
  //       where: { id: sourceVideoId, ownerId: userId },
  //     });

  //     if (!video) {
  //       throw new ForbiddenException('Invalid video');
  //     }
  //   }

  //   // 2. Create DB stream
  //   const stream = await this.databaseService.stream.create({
  //     data: {
  //       title,
  //       type,
  //       status: 'LIVE',
  //       isLive: true,
  //       ingressId: roomName,
  //       userId,
  //       courseId,
  //       sourceVideoId,
  //       startedAt: new Date(),
  //     },
  //   });

  //   // 3. Create LiveKit room
  //   await this.livekitService.createRoom(roomName);

  //   // 4. Host token
  //   const token = this.createLivekitToken({
  //     roomName,
  //     userId,
  //     isHost: true,
  //   });

  //   return {
  //     streamId: stream.id,
  //     roomName,
  //     streamType: type,
  //     sourceVideoId,
  //     ...token,
  //   };
  // }
}
