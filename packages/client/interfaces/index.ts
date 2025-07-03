export interface IVideo {
    username: string;
    subname: string;
    avatar: string;
    backgroundVideo: string;
    time: string;
    desc: string;
    onWatchDetail: Function;
}

export interface IVideo {
    id: string;
    title: string;
    userId: string;
    likes: number;
    dislikes: number;
    viewsCount: number;
    publicPlaybackId?: boolean
}

export interface IUser {
    id: string;
    username: string;
    fullName: string;
    email: string;
    likedVideos?: string[];
    dislikedVideos?: string[];
}

export interface IVideoDetails {
    title: string;
    userId: string;
    [key: string]: any;
}

