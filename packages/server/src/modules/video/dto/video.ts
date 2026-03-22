import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class VideoDTO {
  title: string;
  description: string;
  thumbnail: string;
  vieoUrl?: string;
  subtitles?: [];
  lessonId: string;
  // ownerId?: string;
  duration: number;
}

export class LessonDTO {
  id: string;
  name: string;
  description: string;
  videos: VideoDTO[];
  courseId: string;
}

// class ChapterReorderItemDto {
//   id: string;
//   position: number;
// }

export class ReorderChapterDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChapterReorderItemDto)
  list: ChapterReorderItemDto[];
}

export class ChapterReorderItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsInt()
  position: number;
}
