import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/service';
import { MinioService } from './minio';
import { LivekitService } from './livekit';
import { MuxService } from './mux';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    AppConfigService,
    ConfigService,
    MinioService,
    LivekitService,
    MuxService,
  ],
  exports: [AppConfigService, MuxService],
})
export class AppConfigModule {}
