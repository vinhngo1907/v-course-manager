import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { VideoDTO } from '@modules/video/dto/video';

export class LessonUpdateStatusDto {
  @IsNotEmpty()
  @IsString()
  lessonId: string;

  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @IsNotEmpty()
  @IsString()
  accountId: string;
}

export class LessonUpdateDTO {
  @ApiProperty({ default: 'this is title' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ default: 'this is description' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ default: 'this is thumbnail' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly thumbnailUrl?: string;

  @ApiProperty({ default: 'this is videoUrl' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly videoUrl?: string;

  @ApiProperty({ default: 'this is courseId' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly courseId: string;

  @ApiProperty({ default: 'this is lessonId' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly lessonId: string;
}

export class LessonDTO {
  id: string;
  name: string;
  description: string;
  videos: VideoDTO[];
  courseId: string;
}

export class LessonResponseDTO {
  id: string;
  name: string;
  description: string;
  videos: VideoDTO[];
  courseId: string;
}
