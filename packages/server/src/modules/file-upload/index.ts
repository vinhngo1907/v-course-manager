import { Module } from '@nestjs/common';
import { FileUploadController } from './controller';
import { MinioService } from 'src/config/minio';
import { FileUploadByS3 } from './strategies/s3';
import { SupabaseService } from 'src/config/supabase';
import { FileUploadBySupabase } from './strategies/supabase';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadByS3, MinioService, SupabaseService, FileUploadBySupabase
    // {
    //   provide: 'FileUpload',
    //   useClass:
    //     process.env.STORAGE_TYPE === 'supabase'
    //       ? FileUploadBySupabase
    //       : FileUploadByS3,
    // },
  ],
  exports: [FileUploadByS3, FileUploadBySupabase],
})
export class FileUploadModule {}
