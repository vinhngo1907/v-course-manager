import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CommentCreationDTO {
  @ApiProperty({ description: 'Content' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'ID lesson', required: false })
  @IsOptional()
  @IsString()
  lessonId?: string;

  @ApiProperty({ description: 'ID video', required: false })
  @IsOptional()
  @IsString()
  videoId: string;

  @ApiProperty({ description: 'ID parent comment (if reply)', required: false })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiPropertyOptional({ description: 'List tags / mentions' })
  @IsOptional()
  @IsArray()
  tags?: string[];
}
