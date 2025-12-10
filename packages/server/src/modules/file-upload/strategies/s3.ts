import * as Minio from 'minio';
import { FileUpload } from '../file-upload.interface';
import { FileUploadType } from 'src/common/enums/file-upload-type.enum';
import { MinioService } from 'src/config/minio';
import { InternalServerErrorException, Logger } from '@nestjs/common';

// const minioClient = new Minio.Client({
//   endPoint: process.env.MINIO_ENDPOINT,
//   port: parseInt(process.env.MINIO_PORT, 10),
//   useSSL: process.env.MINIO_USE_SSL === 'true',
//   accessKey: process.env.MINIO_ACCESS_KEY,
//   secretKey: process.env.MINIO_SECRET_KEY,
// });

export class FileUploadByS3 implements FileUpload {
  private readonly logger: Logger = new Logger(FileUploadByS3.name);
  constructor(private readonly minioService: MinioService) {}

  private get client() {
    return this.minioService.getClient();
  }

  async getAllFile(marker = '') {
    const bucketName = this.minioService.getBucket();
    // const stream = minioClient.listObjectsV2(bucketName, marker, true);
    const stream = this.client.listObjectsV2(bucketName, marker, true);
    const publicUrl = this.minioService.getPublicUrl();

    const data: { url: string; size: number; marker: string }[] = [];

    for await (const obj of stream) {
      data.push({
        url: `${publicUrl}/${bucketName}/${obj.name}`,
        size: obj.size,
        marker: obj.name,
      });
    }

    return { data };
  }

  downloadVideo(url: string) {
    throw new Error('Method not implemented.');
  }

  getVideoByRange(startTime: string, endTime: any) {
    throw new Error('Method not implemented.');
  }

  async uploadFile(file: Express.Multer.File, type: FileUploadType) {
    try {
      const folder = this.minioService.getFolder();
      const bucketName = this.minioService.getBucket();
      const publicUrl = this.minioService.getPublicUrl();

      const fileName = new Date().getTime();
      const fileType = file.originalname.split('.').pop();
      const objectName = `${folder}/${type}/${fileName}.${fileType}`;

      if (file.size <= 60000000) {
        await this.uploadSinglePart(bucketName, objectName, file);
      } else {
        await this.uploadMultiplePart(bucketName, objectName, file);
      }

      // console.log({ uploadPromise });
      // console.log('>>>>' + file.size + '<<<<');
      // await this.uploadSinglePart(bucketName, objectName, file);
      // await minioClient.putObject(bucketName, objectName, file.buffer, file.size, { 'Content-type': file.mimetype });
      // console.log(
      //   `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${objectName}`,
      // );
      return `${publicUrl}/${bucketName}/${objectName}`;
    } catch (error: any) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
  private async uploadSinglePart(
    bucketName: string,
    objectName: string,
    file: Express.Multer.File,
  ) {
    // const uploadResult = await minioClient.putObject(
    const uploadResult = await this.client.putObject(
      bucketName,
      objectName,
      file.buffer,
      file.size,
      { 'Content-type': file.mimetype },
    );
    console.log({ uploadResult });
    return uploadResult;
  }
  private async uploadMultiplePart(
    bucketName: string,
    objectName: string,
    file: Express.Multer.File,
  ) {
    const partSize = 1024 * 1024 * 5; // 5MB parts
    const etags: { etag: string; part: number }[] = [];

    let uploadId = null;
    try {
      // uploadId = await minioClient.initiateNewMultipartUpload(
      uploadId = await this.client.initiateNewMultipartUpload(
        bucketName,
        objectName,
        { 'Content-Type': file.mimetype },
      );

      let partNumber = 1;

      for (
        let part = 1, start = 0;
        start < file.buffer.length;
        start += partSize, part++
      ) {
        const end = Math.min(start + partSize, file.buffer.length);
        const partBuffer = file.buffer.slice(start, end);

        // const partUploadInfo = await minioClient.putObject(
        const partUploadInfo = await this.client.putObject(
          bucketName,
          objectName,
          uploadId,
          part,
          partBuffer,
        );

        etags.push({ etag: partUploadInfo.etag, part: partNumber });
        partNumber++;
      }

      // await minioClient.completeMultipartUpload(
      await this.client.completeMultipartUpload(
        bucketName,
        objectName,
        uploadId,
        etags,
      );
    } catch (error) {
      if (uploadId) {
        // await minioClient.abortMultipartUpload(
        await this.client.abortMultipartUpload(
          bucketName,
          objectName,
          uploadId,
        );
      }
      throw error;
    }
  }
}
