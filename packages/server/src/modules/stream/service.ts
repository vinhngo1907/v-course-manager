import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '@modules/database/service';
import { VideoService } from '@modules/video/service';
import { AccessToken } from 'livekit-server-sdk';
import { AppConfigService } from 'src/config/service';

@Injectable()
export class StreamService {
  private readonly logger: Logger = new Logger(StreamService.name);
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly videoService: VideoService,
    private readonly appConfigService: AppConfigService,
  ) {}
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

  /**
   * Start recording
   */
  //   async startRecord(roomName: string){
  //     // const outputFile = `${roomName}-${Date.now()}.mp4`;
  //     const fileOutput = new EncodedFileOutput({
  //   filepath: 'livekit-demo/room-composite-test.mp4',
  //   output: {
  //     case: 's3',
  //     value: new S3Upload({
  //       accessKey: 'aws-access-key',
  //       secret: 'aws-access-secret',
  //       region: 'aws-region',
  //       bucket: 'my-bucket',
  //     }),
  //   },
  // });

  //     const res = await this.egressClient.startRoomCompositeEgress(roomName, {
  //       file: fileOutput,
  //     });
  //   }
}
