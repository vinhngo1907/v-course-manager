import * as Minio from 'minio';
import { FileUpload } from '../file-upload.interface';
import { FileUploadType } from 'src/common/enums/file-upload-type.enum';

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,          // MinIO server endpoint
    port: parseInt(process.env.MINIO_PORT, 10),    // MinIO server port (e.g., 9000)
    useSSL: process.env.MINIO_USE_SSL === 'true',  // true if using SSL
    accessKey: process.env.MINIO_ACCESS_KEY,       // Access key for MinIO
    secretKey: process.env.MINIO_SECRET_KEY,       // Secret key for MinIO
});


export class FileUploadByS3 implements FileUpload {
    async getAllFile(marker: string = "") {
        const bucketName = process.env.MINIO_BUCKET_NAME;
        const stream = minioClient.listObjectsV2(bucketName, marker, true);
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            MaxKeys: 10,
            Marker: marker,
        }

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
            const uploadPromise =
                file.size <= 6000000
                    && await this.uploadSinglePart(bucketName, objectName, file)
                    // : await this.uploadMultiplePart(bucketName, objectName, file);

            return `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${objectName}`;
        } catch (error) {

        }
    }
    private async uploadSinglePart(
        bucketName: string,
        objectName: string,
        file: Express.Multer.File,
    ) {
        await minioClient.putObject(bucketName, objectName, file.buffer, null, {'Content-type': file.mimetype});
    }
    // private async uploadMultiplePart(
    //     bucketName: string, 
    //     objectName: string, 
    //     file: Express.Multer.File
    // ) {
    //     const partSize = 1024 * 1024 * 5; // 5MB parts
    //     const etags: { etag: string; part: number }[] = [];

    //     let uploadId;
    //     try {
    //         uploadId = await minioClient.initiateNewMultipartUpload(bucketName, objectName);

    //         for (let part = 1, start = 0; start < file.buffer.length; start += partSize, part++) {
    //             const end = Math.min(start + partSize, file.buffer.length);
    //             const partBuffer = file.buffer.slice(start, end);

    //             const etag = await minioClient.putObjectPart(
    //                 bucketName,
    //                 objectName,
    //                 uploadId,
    //                 part,
    //                 partBuffer,
    //             );

    //             etags.push({ etag, part });
    //         }

    //         await minioClient.completeMultipartUpload(bucketName, objectName, uploadId, etags);
    //     } catch (error) {
    //         if (uploadId) {
    //             await minioClient.abortMultipartUpload(bucketName, objectName, uploadId);
    //         }
    //         throw error;
    //     }
    // }
}