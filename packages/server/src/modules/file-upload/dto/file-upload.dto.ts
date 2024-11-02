import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { FileUploadType } from 'src/common/enums/file-upload-type.enum';

export class FileUploadDTO {
    @ApiProperty({ default: 'this is type' })
    @IsEnum(FileUploadDTO)
    @IsNotEmpty()
    readonly type: FileUploadType;
}