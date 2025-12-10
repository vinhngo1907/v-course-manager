import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '@modules/database/service';
import { VideoService } from '@modules/video/service';

@Injectable()
export class StreamService {
  private readonly logger: Logger = new Logger(StreamService.name);
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly videoService: VideoService,
  ) {}
}
