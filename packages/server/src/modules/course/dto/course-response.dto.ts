// import { Optional } from "@nestjs/common";
import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class CourseResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnailUrl: string;

  @ApiProperty()
  published?: boolean;

  @ApiProperty({ required: false })
  progress?: number;

  @ApiProperty({ required: false })
  totalVideos?: number;

  @ApiProperty({ required: false })
  completedVideos?: number;

  // @ApiProperty()
  // createdAt: Date;

  // @ApiProperty()
  // updatedAt: Date;
}
