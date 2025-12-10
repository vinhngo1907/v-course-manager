import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/service';
import { MinioService } from './minio';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AppConfigService, ConfigService, MinioService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
