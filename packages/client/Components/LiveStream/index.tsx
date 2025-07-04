import React, { useEffect } from "react";
import MainScreen from "@/Components/MainScreen";
import { db, ServerValue } from "@/streamingServer/firebase";
import {
    setMainStream,
    addParticipant,
    setUser,
    removeParticipant,
    updateParticipant,
    setStreamer,
    setStreamId,
    updateParticipantField,
    Participant,
} from "../../redux/features/liveVideoStreamingSlice";
import { useDispatch } from "react-redux";
import { getAllVideos, createVideo } from "@/services/video";
import { AppDispatch, useAppSelector } from '@/redux/store';

const LiveStream: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const stream = useAppSelector((state) => state.liveVideoStreaming.mainStream);
    const user = useAppSelector((state) => state.liveVideoStreaming.currentUser);
    const isStreamer = useAppSelector((state) => state.liveVideoStreaming.isStreamer);

    const userData = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("user") || "{}" : "{}");
    const userName = userData?.username || "Guest";

    let firepadRef: any = null;

    useEffect(() => {
        if (typeof window === "undefined") return;

        const urlparams = new URLSearchParams(window.location.search);
        const roomId = urlparams.get("id");

        firepadRef = db.ref();
        if (roomId) {
            firepadRef = firepadRef.child(roomId);
        } else {
            firepadRef = firepadRef.push();
            window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);

            window.onbeforeunload = (e: any) => {
                e.preventDefault();
                e.returnValue = "";
                firepadRef.remove().then(() => {
                    console.log("All data removed successfully.");
                });
            };
        }

        const connectedRef = db.ref(".info/connected");
        const participantRef = firepadRef.child("participants");

        const getUserStream = async (): Promise<MediaStream> => {
            return await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        };

        const setup = async () => {
            const localStream = await getUserStream();
            localStream.getVideoTracks()[0].enabled = false;
            dispatch(setMainStream(localStream));

            connectedRef.on("value", (snap: any) => {
                if (snap.val()) {
                    const defaultPreference = {
                        audio: true,
                        video: false,
                        screen: false,
                    };
                    const userStatusRef = participantRef.push({
                        userName,
                        timestamp: ServerValue.TIMESTAMP,
                        preferences: defaultPreference,
                    });

                    dispatch(setUser({ [userStatusRef.key as string]: { name: userName, ...defaultPreference } }));
                    userStatusRef.onDisconnect().remove();
                }
            });
        };

        setup();

        // Listen participants
        if (stream && user) {
            participantRef.on("child_added", (snap: any) => {
                const { userName: name, preferences = {} } = snap.val();

                participantRef
                    .orderByChild("timestamp")
                    .limitToFirst(1)
                    .once("value")
                    .then((snapshot: any) => {
                        const firstElement = snapshot.val();
                        dispatch(setStreamer(firstElement));
                    });

                const preferenceRef = participantRef.child(snap.key as string).child("preferences");
                preferenceRef.on("child_changed", (prefSnap: any) => {
                    dispatch(updateParticipantField({
                        userId: snap.key as string,
                        field: prefSnap.key as keyof Participant,
                        value: prefSnap.val(),
                    }));
                });

                dispatch(addParticipant({ [snap.key as string]: { name, ...preferences } }));
            });

            participantRef.on("child_removed", (snap: any) => {
                dispatch(removeParticipant(snap.key as string));
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stream, user]);

    useEffect(() => {
        const checkLiveExist = async () => {
            const videos = await getAllVideos();
            const exists = videos?.data?.data?.some((video: any) => video.title === `Live streaming from ${userName}`);

            if (isStreamer && !exists) {
                const res = await createVideo({
                    description: `live streaming from ${userName}, enjoy...`,
                    title: `Live streaming from ${userName}`,
                    userId: `${userData.id}`,
                    tags: ["live stream"],
                    videoURL: window.location.href,
                    videoStatus: "public",
                    thumbnailUrl: "https://media.gettyimages.com/...jpg",
                });

                if (res.status === 201) {
                    dispatch(setStreamId(res?.data?.id));
                }
            }
        };

        checkLiveExist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStreamer]);

    return (
        <div className="App">
            <MainScreen />
        </div>
    );
};

export default LiveStream;