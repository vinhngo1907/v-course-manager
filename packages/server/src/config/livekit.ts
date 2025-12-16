// livekit.service.ts
import { Injectable } from '@nestjs/common';
import { RoomServiceClient } from 'livekit-server-sdk';
import { AppConfigService } from 'src/config/service';

@Injectable()
export class LivekitService {
  private roomService: RoomServiceClient;
  private apiKey: string;
  private apiSecret: string;
  private host: string;

  constructor(private readonly config: AppConfigService) {
    const cfg = this.config.getLivekitConfig();

    this.apiKey = cfg.apiKey;
    this.apiSecret = cfg.apiSecret;
    this.host = cfg.host;

    this.roomService = new RoomServiceClient(
      cfg.host,
      this.apiKey,
      this.apiSecret,
    );
  }

  /** Create room */
  async createRoom(name: string) {
    return await this.roomService.createRoom({ name });
  }

  /** Create token */
  async createHostToken(roomName: string, identity: string) {
    const { AccessToken } = require('livekit-server-sdk');
    const token = new AccessToken(this.apiKey, this.apiSecret, {
      identity,
      ttl: '1h',
    });

    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishSources: ['camera', 'microphone', 'screen_share'],
    });

    return token.toJwt();
  }

  /** Create token for viewer */
  createViewerToken(roomName: string, identity: string) {
    const { AccessToken } = require('livekit-server-sdk');
    const token = new AccessToken(this.apiKey, this.apiSecret, {
      identity,
      ttl: '1h',
    });

    token.addGrant({
      room: roomName,
      roomJoin: true,
      canSubscribe: true,
      canPublish: false,
    });

    return token.toJwt();
  }

  public getServerUrl() {
    return this.host;
  }

  /** Start Recorder */
  //   async startRecording(room: string) {
  //     const req: CreateRecordingRequest = {
  //       roomName: room,
  //       options: {
  //         // Output video to file mp4 in LiveKit
  //         fileType: "mp4",
  //         videoCodec: "h264",
  //       },
  //     };

  //     return await this.roomService.startRecording(req);
  //   }
}
