import * as Minio from 'minio';
import { FileUpload } from '../file-upload.interface';
import { FileUploadType } from 'src/common/enums/file-upload-type.enum';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT, 10),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

export class FileUploadByS3 implements FileUpload {
  async getAllFile(marker: string = '') {
    const bucketName = process.env.MINIO_BUCKET_NAME;
    const stream = minioClient.listObjectsV2(bucketName, marker, true);
    // const params = {
    //   Bucket: process.env.AWS_S3_BUCKET_NAME,
    //   MaxKeys: 10,
    //   Marker: marker,
    // };

    const data: { url: string; size: number; marker: string }[] = [];

    for await (const obj of stream) {
      data.push({
        url: `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${obj.name}`,
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
      const fileType = file.originalname.split('.').pop();
      const fileName = new Date().getTime();
      const objectName = `${process.env.MINIO_FOLDER}/${type}/${fileName}.${fileType}`;
      const bucketName = process.env.MINIO_BUCKET_NAME;
      console.log({ fileType, fileName, objectName, bucketName });
      const uploadPromise =
        file.size <= 60000000
          ? await this.uploadSinglePart(bucketName, objectName, file)
          : await this.uploadMultiplePart(bucketName, objectName, file);

      // console.log({ uploadPromise });
      // console.log('>>>>' + file.size + '<<<<');
      // await this.uploadSinglePart(bucketName, objectName, file);
      // await minioClient.putObject(bucketName, objectName, file.buffer, file.size, { 'Content-type': file.mimetype });
      // console.log(
      //   `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${objectName}`,
      // );
      return `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${objectName}`;
    } catch (error) {}
  }
  private async uploadSinglePart(
    bucketName: string,
    objectName: string,
    file: Express.Multer.File,
  ) {
    const uploadResult = await minioClient.putObject(
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

    let uploadId;
    try {
      uploadId = await minioClient.initiateNewMultipartUpload(
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

        const partUploadInfo = await minioClient.putObject(
          bucketName,
          objectName,
          uploadId,
          part,
          partBuffer,
        );

        etags.push({ etag: partUploadInfo.etag, part: partNumber });
        partNumber++;
      }

      await minioClient.completeMultipartUpload(
        bucketName,
        objectName,
        uploadId,
        etags,
      );
    } catch (error) {
      if (uploadId) {
        await minioClient.abortMultipartUpload(
          bucketName,
          objectName,
          uploadId,
        );
      }
      throw error;
    }
  }
}
