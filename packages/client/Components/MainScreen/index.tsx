import React, { useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
    updateUser,
    addOrUpdateParticipant,
    removeParticipant,
} from "@/redux/features/liveVideoStreamingSlice";

import MeetingFooter from "@/Components/MeetingFooter";
import Participants from "@/Components/Participants";
import SidePanel from "@/Components/MainScreen/SidePanel";

import { connectToRoom } from "@/libs/livekit";
import {
    Room,
    Participant,
    RemoteParticipant,
    LocalParticipant,
    RoomEvent,
    TrackPublication,
    Track,
} from "livekit-client";
import { AuthContext } from "@/context/AuthContext";
import { axios } from "@/utils/axios";
import { AuthorizationHeader } from "@/services/request.extras";

const MainScreen: React.FC<{ isStreamer: boolean, roomName: string | null }> = ({
    isStreamer, roomName
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const roomRef = useRef<Room | null>(null);
    const {authState: {user}} = useContext(AuthContext)!;

    useEffect(() => {
        const joinRoom = async () => {
            const res = await axios.post('/stream/token', {
                roomName, userId: user && user.id
            },{
                withCredentials: true,
                headers: AuthorizationHeader()
            });
            
            const { token, serverUrl } = await res.data;
            const room = await connectToRoom(serverUrl, token);
            roomRef.current = room;

            const lp = room.localParticipant;

            // ⭐ Streamer turn on camera
            if (isStreamer) {
                await lp.setCameraEnabled(true);
                await lp.setMicrophoneEnabled(true);
            }

            // ⭐ Save local participant
            dispatch(
                addOrUpdateParticipant({
                    identity: lp.identity,
                    name: lp.identity,
                    audioEnabled: lp.isMicrophoneEnabled,
                    videoEnabled: lp.isCameraEnabled,
                    screenEnabled: lp.isScreenShareEnabled ?? false,
                    isLocal: true,
                })
            );

            // 🔥 ---------------------------
            // LISTEN FOR REMOTE EVENTS
            // 🔥 ---------------------------

            // ⭐ Someone joined
            room.on(RoomEvent.ParticipantConnected, (p: Participant) => {
                dispatch(
                    addOrUpdateParticipant({
                        identity: p.identity,
                        name: p.identity,
                        audioEnabled: p.isMicrophoneEnabled,
                        videoEnabled: p.isCameraEnabled,
                        screenEnabled: p.isScreenShareEnabled ?? false,
                    })
                );
            });

            // ⭐ Someone left
            room.on(RoomEvent.ParticipantDisconnected, (p: Participant) => {
                dispatch(removeParticipant(p.identity));
            });

            // ⭐ Track subscribed → video/audio receive
            room.on(
                RoomEvent.TrackSubscribed,
                (track, pub: TrackPublication, participant: Participant) => {
                    if (track.kind === Track.Kind.Video) {
                        dispatch(
                            addOrUpdateParticipant({
                                identity: participant.identity,
                                videoTrack: track,
                                videoEnabled: true,
                                audioEnabled: participant.isMicrophoneEnabled,
                                name: participant.identity,
                            } as any)
                        );
                    }
                }
            );

            // ⭐ Track unsubscribed → lost video
            room.on(
                RoomEvent.TrackUnsubscribed,
                (track, pub: TrackPublication, participant: Participant) => {
                    if (track.kind === Track.Kind.Video) {
                        dispatch(
                            addOrUpdateParticipant({
                                identity: participant.identity,
                                videoTrack: undefined,
                                videoEnabled: false,
                            } as any)
                        );
                    }
                }
            );

            // ⭐ When user mutes/unmutes mic/cam
            const updateState = (p: Participant) => {
                dispatch(
                    addOrUpdateParticipant({
                        identity: p.identity,
                        name: p.name ?? p.identity,
                        audioEnabled: p.isMicrophoneEnabled,
                        videoEnabled: p.isCameraEnabled,
                        screenEnabled: p.isScreenShareEnabled ?? false,
                    })
                );
            };

            room.on(RoomEvent.TrackMuted, (_, participant) => updateState(participant));
            room.on(RoomEvent.TrackUnmuted, (_, participant) => updateState(participant));
        };

        joinRoom();

        return () => {
            roomRef.current?.disconnect();
        };
    }, []);

    // ==========================
    // TOGGLE FUNCTIONS
    // ==========================

    const toggleMic = async (enabled: boolean) => {
        roomRef.current?.localParticipant.setMicrophoneEnabled(enabled);
        dispatch(updateUser({ audioEnabled: enabled }));
    };

    const toggleVideo = async (enabled: boolean) => {
        roomRef.current?.localParticipant.setCameraEnabled(enabled);
        dispatch(updateUser({ videoEnabled: enabled }));
    };

    const toggleScreen = async () => {
        const enabled =
            !roomRef.current?.localParticipant.isScreenShareEnabled;
        await roomRef.current?.localParticipant.setScreenShareEnabled(enabled);
        dispatch(updateUser({ screenEnabled: enabled }));
    };

    // ==========================

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
                        onScreenClick={toggleScreen}
                        onMicClick={toggleMic}
                        onVideoClick={toggleVideo}
                    />
                </div>
            )}
        </div>
    );
};

export default MainScreen;