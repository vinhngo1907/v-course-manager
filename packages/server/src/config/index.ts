import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/service';
import { MinioService } from './minio';
import { LivekitService } from './livekit';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AppConfigService, ConfigService, MinioService, LivekitService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
