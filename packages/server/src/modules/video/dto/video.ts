import { Lesson } from "@prisma/client";

export class VideoDTO {
    title: string;
    description: string;
    thumbnail: string;
    vieoUrl?: string;
    subtitles?: [];
    lessonId: string;
    ownerId: string;
    duration: number
}

export class LessonDTO {
    id: string;
    name: string;
    description: string;
    video: VideoDTO;
    courseId: string
}