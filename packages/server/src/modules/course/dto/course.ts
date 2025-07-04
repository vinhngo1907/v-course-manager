import { ApiProperty } from '@nestjs/swagger';
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