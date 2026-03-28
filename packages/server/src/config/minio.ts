import { Injectable } from '@nestjs/common';
import { Client as MinioClient } from 'minio';
import { AppConfigService } from 'src/config/service';

@Injectable()
export class MinioService {
  private readonly minio: MinioClient;
  private readonly bucket: string;
  private readonly publicUrl: string;
  private readonly folder: string;
  constructor(private readonly appConfigService: AppConfigService) {
    const cfg = this.appConfigService.getMinioConfig();
    // console.log(">>>>>" ,{cfg});
    this.minio = new MinioClient({
      endPoint: "minio-service-ijed.onrender.com",
      // port: cfg.port,
      // useSSL: cfg.useSSL,
      useSSL: true,
      accessKey: cfg.accessKey,
      secretKey: cfg.secretKey,
      pathStyle: true,
    });

    this.bucket = cfg.bucket;
    this.publicUrl = cfg.publicUrl;
    this.folder = cfg.folder;
  }
  getClient() {
    return this.minio;
  }

  getBucket() {
    return this.bucket;
  }

  getPublicUrl() {
    return this.publicUrl;
  }

  getFolder() {
    return this.folder;
  }

  async getVideoUrl(fileName: string) {
    return this.minio.presignedGetObject(
      this.bucket,
      `${this.folder}/${fileName}`,
      60 * 60 // 1 hour
    );
  }
}
