import React from "react";
import { useAppSelector } from "@/redux/store";
import StreamerView from "@/Components/LiveStream/StreamerView";
import ParticipantView from "@/Components/LiveStream/ParticipantView";

const LiveStream: React.FC = () => {
    const isStreamer = useAppSelector(
        (state) => state.liveVideoStreaming.isStreamer
    );

    return isStreamer ? <StreamerView /> : <ParticipantView />;
};

export default LiveStream;
