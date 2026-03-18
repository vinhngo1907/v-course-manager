import { Module } from '@nestjs/common';
import { FileUploadController } from './controller';
// import { MinioService } from 'src/config/minio';
import { FileUploadByS3 } from './strategies/s3';
import { MinioService } from 'src/config/minio';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadByS3, MinioService],
  exports: [FileUploadByS3],
})
export class FileUploadModule {}
