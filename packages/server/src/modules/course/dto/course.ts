import { ApiProperty } from '@nestjs/swagger';
import { Course, Lesson, Video } from '@prisma/client';
import { IsEmpty, IsNotEmpty, IsUUID } from 'class-validator';

export interface CourseDTO {
	title: string;
	description: string;
	thumbnail?: string;
	videos?: string[];
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

export type CourseWithLessonsDTO = Course & {
	lessons: (Lesson & { video: Video | null })[];
};

export interface CourseByUser {
	courseId: string;
	userId: string;
}