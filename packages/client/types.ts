export type Profile = {
    id: string;
    email: string;
    fullName: string;
    username: string;
};

export type Course = {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    published: boolean;
    lessons: Lesson[] | [];
}


export type Lesson = {
    id: string;
    name: string;
    description: string;
    video: Video;
}

export type Video = {
    id: string;
    title: string;
    userId: string;
    likes: number;
    dislikes: number;
    viewsCount: number;
    publicPlaybackId?: boolean
    thumbnail: string
    videoUrl: string;
    duration: number;
}

export type CourseViewerProps = {
    course: Course, // Course đã bao lessons với Lesson đã bao video rồi!
    lessonProgress: string[],
    setLessonProgress: (ids: string[]) => void
}