export interface CourseDTO {
    title: string;
    description: string;
    thumbnail?: string;
    videos?: string[];
}

export interface RegisterCourseDTO {
    userId: string;
    courseId: string;
}