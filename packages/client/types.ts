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
}


export type Lesson = {
    id: string;
    name: string;
}

export type Video = {
    id: string;
    title: string;
    userId: string;
    likes: number;
    dislikes: number;
    viewsCount: number;
    publicPlaybackId?: boolean
}