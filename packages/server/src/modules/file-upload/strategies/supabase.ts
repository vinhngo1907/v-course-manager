import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase';
import { FileUpload } from '../file-upload.interface';
import { FileUploadType } from 'src/common/enums/file-upload-type.enum';

@Injectable()
export class FileUploadBySupabase implements FileUpload {
  private readonly logger = new Logger(FileUploadBySupabase.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.getClient();
  }

  async uploadFile(file: Express.Multer.File, type: FileUploadType) {
    try {
      const folder = this.supabaseService.getFolder();
      const bucket = this.supabaseService.getBucket();

      const fileName = `${Date.now()}`;
      const fileType = file.originalname.split('.').pop();

      const filePath = `${folder}/${type}/${fileName}.${fileType}`;

      const { error } = await this.client.storage
        .from(bucket)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;

      return await this.supabaseService.getPublicUrl(filePath);
    } catch (error: any) {
      this.logger.error('[UPLOAD_FAILED]', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllFile(prefix = '') {
    try {
      const bucket = this.supabaseService.getBucket();

      const { data, error } = await this.client.storage
        .from(bucket)
        .list(prefix, {
          limit: 100,
          offset: 0,
        });

      if (error) throw error;

      const files = await Promise.all(
        data.map(async (file) => ({
          name: file.name,
          size: file.metadata?.size || 0,
          url: await this.supabaseService.getPublicUrl(
            `${prefix}/${file.name}`,
          ),
        })),
      );

      return { data: files };
    } catch (error: any) {
      this.logger.error('[LIST_FAILED]', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async downloadVideo(path: string) {
    // similar to presigned URL in MinIO
    return this.supabaseService.getSignedUrl(path);
  }

  async getVideoByRange(startTime: string, endTime: any) {
    // ❌ Supabase does NOT support range streaming like S3
    this.logger.warn('Range streaming is not supported in Supabase');
    throw new Error('Range streaming is not supported in Supabase');
  }
}