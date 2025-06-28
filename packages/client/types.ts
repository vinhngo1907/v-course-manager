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
}

export interface Video {
    id: string;
    title: string;
    userId: string;
    likes: number;
    dislikes: number;
    viewsCount: number;
    publicPlaybackId?: boolean
}

export interface Lesson {
    id: string;
    name: string;
}