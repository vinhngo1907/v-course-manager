import { useContext, useEffect, useState } from "react";
import { connectToRoom } from "@/libs/livekit";
import {
    addOrUpdateParticipant,
    removeParticipant
} from "@/redux/features/liveVideoStreamingSlice";
import { useDispatch } from "react-redux";

import {
    RoomEvent,
    createLocalVideoTrack,
    createLocalAudioTrack,
    LocalVideoTrack,
    Participant,
    Room
} from "livekit-client";
import MainScreen from "../MainScreen";
import { AuthContext } from "@/context/AuthContext";
import { axios } from "@/utils/axios";
import { AuthorizationHeader } from "@/services/request.extras";

export default function StreamerView() {
    const dispatch = useDispatch();
    const [mode, setMode] = useState<"webcam" | "file" | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const { authState: { user } } = useContext(AuthContext)!;
    const [roomName, setRoomName] = useState<string | null>(null);

    // useEffect(() => {
    //     if (!mode) return;
    //     let room: Room;

    //     const startStreaming = async () => {
    //         const res = await axios.post('/stream/start-live', {}, {
    //             withCredentials: true,
    //             headers: AuthorizationHeader(),
    //         });

    //         const { roomName: newRoomName, token, serverUrl } = await res.data;
    //         setRoomName(newRoomName);
    //         room = await connectToRoom(serverUrl, token);

    //         // --- PUBLISH TRACKS ---
    //         if (mode === "webcam") {
    //             const cam = await createLocalVideoTrack();
    //             const mic = await createLocalAudioTrack();

    //             await room.localParticipant.publishTrack(cam);
    //             await room.localParticipant.publishTrack(mic);
    //         }

    //         if (mode === "file" && videoFile) {
    //             const videoElement = document.createElement("video");
    //             videoElement.src = URL.createObjectURL(videoFile);
    //             videoElement.muted = true;
    //             // ensure the element starts playing so captureStream works reliably
    //             try {
    //                 await videoElement.play();
    //             } catch (err) {
    //                 console.warn("videoElement.play() failed:", err);
    //             }

    //             // create a MediaStream from the video element and build a LocalVideoTrack
    //             const captureStream = (videoElement as HTMLVideoElement & {
    //                 captureStream?: () => MediaStream;
    //             }).captureStream?.();

    //             if (!captureStream) {
    //                 console.error("captureStream() is not supported in this browser");
    //             } else {
    //                 const mediaTrack = captureStream.getVideoTracks()[0];
    //                 if (!mediaTrack) {
    //                     console.error("No video track available from captured stream");
    //                 } else {
    //                     const fileTrack = new LocalVideoTrack(mediaTrack as MediaStreamTrack);
    //                     await room.localParticipant.publishTrack(fileTrack);
    //                 }
    //             }
    //         }

    //         // --- UPDATE STREAMER TO REDUX ---
    //         dispatch(
    //             addOrUpdateParticipant({
    //                 identity: room.localParticipant.identity,
    //                 name: "Streamer",
    //                 audioEnabled: true,
    //                 videoEnabled: true,
    //                 screenEnabled: false
    //             })
    //         );

    //         // --- LISTEN FOR JOINERS ---
    //         room.on(RoomEvent.ParticipantConnected, (p: Participant) => {
    //             dispatch(
    //                 addOrUpdateParticipant({
    //                     identity: p.identity,
    //                     name: p.identity,
    //                     audioEnabled: p.isMicrophoneEnabled,
    //                     videoEnabled: p.isCameraEnabled,
    //                     screenEnabled: false
    //                 })
    //             );
    //         });

    //         // --- LISTEN LEAVERS ---
    //         room.on(RoomEvent.ParticipantDisconnected, (p: Participant) => {
    //             dispatch(removeParticipant(p.identity));
    //         });
    //     }

    //     startStreaming();

    //     return () => {
    //         room?.disconnect();
    //     };
    // }, [mode, videoFile]);

    useEffect(() => {
        if (!mode) return;
        let room: Room;

        const startStreaming = async () => {
            const res = await axios.post("/stream/start-live", {}, {
                headers: AuthorizationHeader(),
            });

            const { roomName, token, serverUrl } = res.data;
            room = await connectToRoom(serverUrl, token);

            if (mode === "webcam") {
                const cam = await createLocalVideoTrack();
                const mic = await createLocalAudioTrack();
                await room.localParticipant.publishTrack(cam);
                await room.localParticipant.publishTrack(mic);
            }

            dispatch(
                addOrUpdateParticipant({
                    identity: room.localParticipant.identity,
                    name: "Streamer",
                    screenEnabled: true,
                    isLocal: true,
                    videoEnabled: true,
                    audioEnabled: true,
                })
            );

            room.on(RoomEvent.ParticipantConnected, (p: Participant) => {
                dispatch(
                    addOrUpdateParticipant({
                        identity: p.identity,
                        name: p.identity,
                        screenEnabled: true,
                        audioEnabled: p.isMicrophoneEnabled,
                        videoEnabled: p.isCameraEnabled,
                    })
                );
            });

            room.on(RoomEvent.ParticipantDisconnected, (p) => {
                dispatch(removeParticipant(p.identity));
            });
        };

        startStreaming();

        return () => {
            room?.disconnect();
        };
    }, [mode]);

    return (
        <div className="p-4">
            {!mode && (
                <div className="space-y-3">
                    <button
                        onClick={() => setMode("webcam")}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        🎥 Livestream Webcam
                    </button>

                    <button
                        onClick={() => setMode("file")}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        🎬 Livestream Video File
                    </button>
                </div>
            )}

            {mode === "file" && !videoFile && (
                <div className="mt-4">
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    />
                </div>
            )}

            {mode && user && <MainScreen isStreamer roomName={roomName} />}
        </div>
    );
}
