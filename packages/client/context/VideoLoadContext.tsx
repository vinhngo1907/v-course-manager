// context/VideoUploadContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export type VideoDetailsType = {
    title?: string;
    description?: string;
    videoStatus?: string;
    videoURL?: string;
    thumbnailUrl?: string;
    tags?: string[];
    userId: string | undefined;
    likes: number | undefined;
    dislikes: number;
    viewsCount: number;
    videoUrl: string;
    status: string;
    thumbnail: string;
    duration: number;
};

interface VideoUploadContextType {
    uploaded: boolean;
    setUploaded: (v: boolean) => void;
    uploadingProgress: number;
    setUploadingProgress: (p: number) => void;
    videoDetails: VideoDetailsType;
    setVideoDetails: (details: Partial<VideoDetailsType>) => void;
}

const VideoUploadContext = createContext<VideoUploadContextType | undefined>(
    undefined
);

export const VideoUploadProvider = ({ children }: { children: ReactNode }) => {
    const [uploaded, setUploaded] = useState(false);
    const [uploadingProgress, setUploadingProgress] = useState(0);
    const [videoDetails, _setVideoDetails] = useState<VideoDetailsType>({
        userId: undefined,
        likes: 0,
        dislikes: 0,
        viewsCount: 0,
        videoUrl: "",
        status: "",
        thumbnail: "",
        duration: 0,
    });

    const setVideoDetails = (newDetails: Partial<VideoDetailsType>) => {
        _setVideoDetails((prev) => ({ ...prev, ...newDetails }));
    };

    return (
        <VideoUploadContext.Provider
            value={{
                uploaded,
                setUploaded,
                uploadingProgress,
                setUploadingProgress,
                videoDetails,
                setVideoDetails,
            }}
        >
            {children}
        </VideoUploadContext.Provider>
    );
};

export const useVideoUpload = () => {
    const ctx = useContext(VideoUploadContext);
    if (!ctx) throw new Error("useVideoUpload must be used within provider");
    return ctx;
};