// components/MainScreen/VideoPlayer.tsx
import React from "react";

const VideoPlayer: React.FC = () => {
    return (
        <div className="w-full h-full relative">
            <video
                className="w-full h-full object-cover rounded-md"
                autoPlay
                muted
                controls
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white font-bold text-sm rounded">
                LIVE
            </div>
        </div>
    );
};

export default VideoPlayer;