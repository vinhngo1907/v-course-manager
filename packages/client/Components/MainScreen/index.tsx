import React, { useRef, useEffect } from 'react';
import MeetingFooter from '@components/MeetingFooter';
import Participants from '@components/Participants';
import './index.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { setMainStream, updateUser } from '@/redux/features/liveVideoStreamingSlice';


const MainScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const stream = useAppSelector((state) => state.liveVideoStreaming.mainStream);
    const participants = useAppSelector((state) => state.liveVideoStreaming.participants);
    const currentUser = useAppSelector((state) => state.liveVideoStreaming.currentUser);

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

    useEffect(() => {
        participantRef.current = participants;
    }, [participants]);

    const updateStream = (newStream: MediaStream) => {
        for (const key in participantRef.current) {
            const sender = participantRef.current[key];
            if (sender.currentUser) continue;

            const videoSender = sender.peerConnection
                .getSenders()
                .find((s) => s.track?.kind === 'video');

            if (videoSender && newStream.getVideoTracks().length > 0) {
                videoSender.replaceTrack(newStream.getVideoTracks()[0]);
            }
        }

        dispatch(setMainStream(newStream));
    };

    const onScreenShareEnd = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });

        const user = Object.values(currentUser)[0];
        localStream.getVideoTracks()[0].enabled = user.video;

        updateStream(localStream);
        dispatch(updateUser({ screen: false }));
    };

    const onScreenClick = async () => {
        let mediaStream: MediaStream;

        if ((navigator as any).getDisplayMedia) {
            mediaStream = await (navigator as any).getDisplayMedia({ video: true });
        } else if (navigator.mediaDevices.getDisplayMedia) {
            mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        } else {
            mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    ...({ mediaSource: 'screen' } as MediaTrackConstraints)
                }
            });
        }

        mediaStream.getVideoTracks()[0].onended = onScreenShareEnd;

        updateStream(mediaStream);
        dispatch(updateUser({ screen: true }));
    };

    return (
        <div className="wrapper">
            <div className="main-screen">
                <Participants />
            </div>
            <div className="footer">
                <MeetingFooter
                    onScreenClick={onScreenClick}
                    onMicClick={onMicClick}
                    onVideoClick={onVideoClick}
                />
            </div>
        </div>
    );
};

export default MainScreen;
