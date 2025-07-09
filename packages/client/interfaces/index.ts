export interface IVideo {
    username: string;
    subname: string;
    avatar: string;
    backgroundVideo: string;
    time: string;
    desc: string;
    onWatchDetail:  React.MouseEventHandler<HTMLDivElement>;
}

export interface IVideo {
    id: string;
    title: string;
    userId: string;
    likes: number;
    dislikes: number;
    viewsCount: number;
    publicPlaybackId?: boolean;
    role?: string;
}

export interface IUser {
    id: string;
    username: string;
    fullName: string;
    email: string;
    likedVideos?: string[];
    dislikedVideos?: string[];
    role: string ;
}

export interface IVideoDetails {
    title: string;
    userId: string;
    [key: string]: any;
}

export interface VideoItemProps {
  username: string;
  subname: string;
  avatar: string;
  backgroundVideo: string;
  time: string;
  desc: string;
  onWatchDetail: () => void;
}