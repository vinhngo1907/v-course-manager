import React, { useRef, useEffect } from "react";
import "./index.module.css";
import MeetingFooter from "@/Components/MeetingFooter";
import Participants from "@/Components/Participants";
import SidePanel from "@/Components/MainScreen/SidePanel";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
    setMainStream,
    updateUser,
} from "@/redux/features/liveVideoStreamingSlice";

const MainScreen: React.FC<{ isStreamer: boolean }> = ({ isStreamer }) => {
    const dispatch = useDispatch<AppDispatch>();
    const stream = useAppSelector((state) => state.liveVideoStreaming.mainStream);
    const participants = useAppSelector(
        (state) => state.liveVideoStreaming.participants
    );
    const currentUser = useAppSelector(
        (state) => state.liveVideoStreaming.currentUser
    );

    const participantRef = useRef(participants);

    const onMicClick = (micEnabled: boolean) => {
        if (stream) {
            stream.getAudioTracks()[0].enabled = micEnabled;
            dispatch(updateUser({ audio: micEnabled }));
        }
    };

    const onVideoClick = (videoEnabled: boolean) => {
        if (stream) {
            stream.getVideoTracks()[0].enabled = videoEnabled;
            dispatch(updateUser({ video: videoEnabled }));
        }
    };

    const updateStream = (newStream: MediaStream) => {
        for (const key in participantRef.current) {
            const sender = participantRef.current[key];
            if (sender.currentUser) continue;
            if (sender.peerConnection) {
                const videoSender = sender.peerConnection
                    .getSenders()
                    .find((s) => s.track?.kind === "video");

                if (videoSender && newStream.getVideoTracks().length > 0) {
                    videoSender.replaceTrack(newStream.getVideoTracks()[0]);
                }
            }
        }

        dispatch(setMainStream(newStream));
    };

    const onScreenShareEnd = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });

        const user = Object.values(currentUser ?? {})[0];
        if (user) {
            localStream.getVideoTracks()[0].enabled = user.video;
        }

        updateStream(localStream);
        dispatch(updateUser({ screen: false }));
    };

    const onScreenClick = async () => {
        let mediaStream: MediaStream;

        if ((navigator as any).getDisplayMedia) {
            mediaStream = await (navigator as any).getDisplayMedia({ video: true });
        } else if (navigator.mediaDevices.getDisplayMedia) {
            mediaStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });
        } else {
            mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    ...({ mediaSource: "screen" } as MediaTrackConstraints),
                },
            });
        }

        mediaStream.getVideoTracks()[0].onended = onScreenShareEnd;

        updateStream(mediaStream);
        dispatch(updateUser({ screen: true }));
    };

    useEffect(() => {
        participantRef.current = participants;
    }, [participants]);

    return (
        <div className="flex flex-col w-full h-screen bg-black">
            <div className="flex flex-1">
                <div className="flex-1">
                    <Participants />
                </div>
                <div className="w-[400px] border-l border-gray-700">
                    <SidePanel />
                </div>
            </div>

            {isStreamer && (
                <div className="footer">
                    <MeetingFooter
                        onScreenClick={onScreenClick}
                        onMicClick={onMicClick}
                        onVideoClick={onVideoClick}
                    />
                </div>
            )}
        </div>
    );
};

export default MainScreen;