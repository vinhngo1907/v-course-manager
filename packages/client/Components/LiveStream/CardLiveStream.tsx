import React from "react";

interface CardLiveStreamProps {
    streamTitle: string;
    streamerName: string;
    viewerCount: number;
    thumbnailUrl: string;
}

const CardLiveStream: React.FC<CardLiveStreamProps> = ({
    streamTitle,
    streamerName,
    viewerCount,
    thumbnailUrl,
}) => {
    return (
        <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-neutral-900 text-white border border-neutral-700 hover:scale-[1.02] transition-transform duration-200">
            <div className="relative">
                <img
                    src={thumbnailUrl}
                    alt="Live Thumbnail"
                    className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-600 text-xs font-bold px-2 py-1 rounded">
                    LIVE
                </span>
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-xs px-2 py-1 rounded">
                    👀 {viewerCount} watching
                </span>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 truncate">{streamTitle}</h3>
                <p className="text-sm text-gray-400">by {streamerName}</p>
            </div>
        </div>
    );
};

export default CardLiveStream;