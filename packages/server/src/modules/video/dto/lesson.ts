import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { VideoDTO } from './video';

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

  // @ApiProperty({ default: 'this is userId' })
  // @IsString()
  // @Type(() => String)
  // @IsNotEmpty()
  // readonly userId: string;

  //   course?: Course;

  //   @ApiProperty({ example: 60.5 })
  //   @IsNumber()
  //   readonly duration: number;

  //   @ApiProperty({ example: 1 })
  //   @IsNumber()
  //   readonly position: number;
}

export class LessonResponseDTO {
  id: string;
  name: string;
  description: string;
  videos: VideoDTO[];
  courseId: string;
}
