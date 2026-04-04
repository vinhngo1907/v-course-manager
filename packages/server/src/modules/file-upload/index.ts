import { Module } from '@nestjs/common';
import { FileUploadController } from './controller';
import { MinioService } from 'src/config/minio';
import { FileUploadByS3 } from './strategies/s3';
import { SupabaseService } from 'src/config/supabase';
import { FileUploadBySupabase } from './strategies/supabase';
import { AppConfigService } from 'src/config/service';

@Module({
  controllers: [FileUploadController],
  providers: [
    FileUploadByS3,
    MinioService,
    SupabaseService,
    FileUploadBySupabase,
    // {
    //   provide: 'FileUpload',
    //   useClass:
    //     process.env.STORAGE_TYPE === 'supabase'
    //       ? FileUploadBySupabase
    //       : FileUploadByS3,
    // },
    {
      provide: 'FileUpload',
      useFactory: (
        config: AppConfigService,
        s3: FileUploadByS3,
        supabase: FileUploadBySupabase,
      ) => {
        const type = config.getStorageType();

        return type === 'supabase' ? supabase : s3;
      },
      inject: [AppConfigService, FileUploadByS3, FileUploadBySupabase],
    }
  ],
  exports: [FileUploadByS3, FileUploadBySupabase],
})
export class FileUploadModule { }
