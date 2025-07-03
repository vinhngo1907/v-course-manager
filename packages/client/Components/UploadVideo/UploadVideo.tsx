'use client';

import dynamic from 'next/dynamic';
import { useVideoUpload, VideoUploadProvider } from '@/context/VideoLoadContext';

const DragDrop = dynamic(() => import('Components/UploadVideo/DragDrop'), {
    ssr: false,
});
const VideoDetails = dynamic(() => import('Components/UploadVideo/VideoDetails'), {
    ssr: false,
});

export default function UploadVideo() {
    const { uploaded, setUploaded, setVideoDetails } = useVideoUpload();

    const handleUploadSuccess = (details: {
        videoURL: string;
        videoName: string;
        userId: string;
    }) => {
        setVideoDetails(details);
        setUploaded(true);
    };

    return (
        <div>
            {!uploaded ? (
                <DragDrop onUploadSuccess={handleUploadSuccess} />
            ) : (
                <VideoDetails />
            )}
        </div>
    );
}