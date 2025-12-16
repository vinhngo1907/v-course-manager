import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { FileUploadType } from 'src/common/enums/file-upload-type.enum';

export class FileUploadDTO {
  @ApiProperty({
    default: 'this is type',
    example: [
      FileUploadType.COURSE_THUMB,
      FileUploadType.VIDEO_THUMB,
      FileUploadType.VIDEO,
    ],
    enum: FileUploadType,
  })
  @IsEnum(FileUploadType)
  @IsNotEmpty()
  readonly type: FileUploadType;
}
