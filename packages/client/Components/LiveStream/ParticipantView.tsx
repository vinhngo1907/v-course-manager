import { useContext, useEffect, useState } from "react";
import { connectToRoom } from "@/libs/livekit";
import { useDispatch } from "react-redux";
import {
    addOrUpdateParticipant,
    removeParticipant,
} from "@/redux/features/liveVideoStreamingSlice";

import {
    RoomEvent,
    RemoteParticipant,
    RemoteTrackPublication,
    Track,
    Participant,
    Room,
} from "livekit-client";
import { AuthContext } from "@/context/AuthContext";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { axios } from "@/utils/axios";
import { AuthorizationHeader } from "@/services/request.extras";

export default function ParticipantView() {
    const dispatch = useDispatch();
    const { authState: { user } } = useContext(AuthContext)!;
    const router = useRouter();
    const { roomName } = router.query;
    const { userRole } = useAppSelector((state) => state.liveVideoStreaming)!

    const [videoRefs, setVideoRefs] = useState<Record<string, HTMLVideoElement>>({});
    // const [room, setRoom] = useState<any>(null);

    useEffect(() => {
        if (!user || !roomName) return;

        let room: Room;

        const joinRoom = async () => {
            try {
                const role = userRole ? 'streamer' : 'viewer';

                const userId = `${role}_${user.id}`;

                const res = await axios.post('/stream/token', {
                    roomName: 'livestream',
                    userId: userId
                }, {
                    withCredentials: true,
                    headers: AuthorizationHeader(),
                });

                if (!res.data) throw new Error('Failed to fetch token');

                const { token, serverUrl } = await res.data;

                // 4️⃣ Connect to LiveKit
                // const roomInstance = await connectToRoom(serverUrl, token);
                room = await connectToRoom(serverUrl, token);
                // setRoom(roomInstance);

                // 5️⃣ Save local participant vào Redux
                dispatch(
                    addOrUpdateParticipant({
                        identity: room.localParticipant.identity,
                        name: user.username || userId,
                        // audioEnabled: room.localParticipant.isMicrophoneEnabled,
                        // videoEnabled: room.localParticipant.isCameraEnabled,
                        audioEnabled: false,
                        videoEnabled: false,
                        screenEnabled: room.localParticipant.isScreenShareEnabled ?? false,
                        isLocal: true,
                    })
                );

                // 6️⃣ Event: participant join
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

                // 7️⃣ Event: participant leave
                room.on(RoomEvent.ParticipantDisconnected, (p: Participant) => {
                    dispatch(removeParticipant(p.identity));
                    setVideoRefs((prev) => {
                        const updated = { ...prev };
                        delete updated[p.identity];
                        return updated;
                    });
                });

                // 8️⃣ Event: track subscribed (video/audio)
                room.on(
                    RoomEvent.TrackSubscribed,
                    (track: any, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
                        if (track.kind === Track.Kind.Video) {
                            const videoEl = document.createElement("video");
                            videoEl.autoplay = true;
                            videoEl.playsInline = true;
                            track.attach(videoEl);

                            setVideoRefs((prev) => ({
                                ...prev,
                                [participant.identity]: videoEl,
                            }));
                        }
                    }
                );

                // 9️⃣ Event: track unsubscribed
                room.on(
                    RoomEvent.TrackUnsubscribed,
                    (_track: any, _pub: RemoteTrackPublication, participant: Participant) => {
                        setVideoRefs((prev) => {
                            const updated = { ...prev };
                            delete updated[participant.identity];
                            return updated;
                        });
                    }
                );

            } catch (err) {
                console.error("Failed to join LiveKit room:", err);
            }
        };

        joinRoom();

        return () => {
            room?.disconnect();
        };
    }, [user, roomName]);

    return (
        <div style={{ padding: 20 }}>
            <h2>You are a viewer</h2>

            {Object.keys(videoRefs).length === 0 && (
                <p>No active streams from streamer</p>
            )}

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {Object.entries(videoRefs).map(([id, videoEl]) => (
                    <div key={id} style={{ border: "1px solid gray" }}>
                        <div
                            ref={(el) => {
                                if (el && videoEl.parentElement !== el) {
                                    el.appendChild(videoEl);
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
