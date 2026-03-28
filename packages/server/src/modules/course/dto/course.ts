import { VideoDTO } from '@modules/video/dto/video';
import { ApiProperty } from '@nestjs/swagger';
// import { Course, Lesson, Video } from '@prisma/client';
import { IsNotEmpty, IsUUID } from 'class-validator';

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
  published?: boolean;
  categoryId?: string;

  createdBy?: {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
  };

  totalLessons: number;
  totalVideos: number;
  totalDuration: number;
  totalRegistration?: number;

  lessons: LessonWithVideosDTO[];
  registrations?: {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
  }[];
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
