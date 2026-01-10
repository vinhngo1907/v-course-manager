import { VideoDTO } from '@modules/video/dto/video';
import { ApiProperty } from '@nestjs/swagger';
import { Course, Lesson, Video } from '@prisma/client';
import { IsEmpty, IsNotEmpty, IsUUID } from 'class-validator';

export interface CourseDTO {
  title: string;
  description: string;
  thumbnail?: string;
  videos?: VideoDTO[];
}

export class RegisterCourseDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'User ID' })
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'Course ID' })
  courseId: string;
}

export interface CourseWithLessonsDTO {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;

  totalLessons: number;
  totalVideos: number;
  totalDuration: number;

  lessons: LessonWithVideosDTO[];
}


export interface CourseByUser {
  courseId: string;
  userId: string;
}

export interface LessonWithVideosDTO {
  id: string;
  name: string;
  description: string;

  totalVideos: number;
  totalDuration: number;

  videos: {
    title: string;
    description: string;
    thumbnail: string;
  }[];
}
