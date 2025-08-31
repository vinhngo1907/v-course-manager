// import React, { useEffect } from "react";
// import MainScreen from "@/Components/MainScreen";
// import { db, ServerValue } from "@/streamingServer/firebase";
// import { useDispatch } from "react-redux";
// import {
//     setMainStream,
//     setUser,
//     addParticipant,
//     setStreamer,
//     removeParticipant,
//     updateParticipantField,
//     Participant,
// } from "@/redux/features/liveVideoStreamingSlice";
// import { AppDispatch, useAppSelector } from "@/redux/store";

// const StreamerView: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const stream = useAppSelector((state) => state.liveVideoStreaming.mainStream);
//     const user = useAppSelector((state) => state.liveVideoStreaming.currentUser);

//     const userData =
//         typeof window !== "undefined"
//             ? JSON.parse(localStorage.getItem("user") || "{}")
//             : {};
//     const userName = userData?.username || "Streamer";

//     useEffect(() => {
//         if (typeof window === "undefined") return;

//         const urlparams = new URLSearchParams(window.location.search);
//         const roomId = urlparams.get("id");

//         let firepadRef = db.ref();
//         if (roomId) {
//             firepadRef = firepadRef.child(roomId);
//         } else {
//             firepadRef = firepadRef.push();
//             window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
//         }

//         window.onbeforeunload = (e: any) => {
//             e.preventDefault();
//             e.returnValue = "";
//             firepadRef.remove().then(() => console.log("All data removed."));
//         };

//         const connectedRef = db.ref(".info/connected");
//         const participantRef = firepadRef.child("participants");

//         const getUserStream = async (): Promise<MediaStream> => {
//             return await navigator.mediaDevices.getUserMedia({
//                 audio: true,
//                 video: true,
//             });
//         };

//         const setup = async () => {
//             const localStream = await getUserStream();
//             dispatch(setMainStream(localStream));

//             connectedRef.on("value", (snap: any) => {
//                 if (snap.val()) {
//                     const defaultPreference = {
//                         audio: true,
//                         video: true,
//                         screen: false,
//                     };
//                     const userStatusRef = participantRef.push({
//                         userName,
//                         timestamp: ServerValue.TIMESTAMP,
//                         preferences: defaultPreference,
//                     });

//                     dispatch(
//                         setUser({
//                             [userStatusRef.key as string]: { name: userName, ...defaultPreference },
//                         })
//                     );
//                     userStatusRef.onDisconnect().remove();
//                 }
//             });

//             // Listen participant logic
//             participantRef.on("child_added", (snap: any) => {
//                 const { userName: name, preferences = {} } = snap.val();
//                 participantRef
//                     .orderByChild("timestamp")
//                     .limitToFirst(1)
//                     .once("value")
//                     .then((snapshot: any) => {
//                         const firstElement = snapshot.val();
//                         dispatch(setStreamer(firstElement));
//                     });

//                 const preferenceRef = participantRef
//                     .child(snap.key as string)
//                     .child("preferences");

//                 preferenceRef.on("child_changed", (prefSnap: any) => {
//                     dispatch(
//                         updateParticipantField({
//                             userId: snap.key as string,
//                             field: prefSnap.key as keyof Participant,
//                             value: prefSnap.val(),
//                         })
//                     );
//                 });

//                 dispatch(
//                     addParticipant({ [snap.key as string]: { name, ...preferences } })
//                 );
//             });

//             participantRef.on("child_removed", (snap: any) => {
//                 dispatch(removeParticipant(snap.key as string));
//             });
//         };

//         setup();
//     }, []);

//     return <MainScreen isStreamer />;
// };

// export default StreamerView;

import React, { useEffect } from "react";
import MainScreen from "@/Components/MainScreen";
import { db, ServerValue } from "@/streamingServer/firebase";
import { useDispatch } from "react-redux";
import {
    setMainStream,
    setUser,
    addParticipant,
    setStreamer,
    removeParticipant,
    updateParticipantField,
    Participant,
    setStreamId,
} from "@/redux/features/liveVideoStreamingSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { createVideo, getAllVideos } from "@/services/video";
import { Video } from "@/types";

const StreamerView: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const stream = useAppSelector((state) => state.liveVideoStreaming.mainStream);
    const user = useAppSelector((state) => state.liveVideoStreaming.currentUser);

    const userData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user") || "{}")
            : {};
    const userName = userData?.username || "Streamer";

    useEffect(() => {
        if (typeof window === "undefined") return;

        const urlparams = new URLSearchParams(window.location.search);
        const roomId = urlparams.get("id");

        let firepadRef = db.ref();
        if (roomId) {
            firepadRef = firepadRef.child(roomId);
        } else {
            firepadRef = firepadRef.push();
            window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
        }

        window.onbeforeunload = (e: any) => {
            e.preventDefault();
            e.returnValue = "";
            firepadRef.remove().then(() => console.log("All data removed."));
        };

        const connectedRef = db.ref(".info/connected");
        const participantRef = firepadRef.child("participants");

        const getUserStream = async (): Promise<MediaStream> => {
            return await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
        };

        const setup = async () => {
            const localStream = await getUserStream();
            dispatch(setMainStream(localStream));

            connectedRef.on("value", (snap: any) => {
                if (snap.val()) {
                    const defaultPreference = {
                        audio: true,
                        video: true,
                        screen: false,
                    };
                    const userStatusRef = participantRef.push({
                        userName,
                        timestamp: ServerValue.TIMESTAMP,
                        preferences: defaultPreference,
                    });

                    dispatch(
                        setUser({
                            [userStatusRef.key as string]: { name: userName, ...defaultPreference },
                        })
                    );
                    userStatusRef.onDisconnect().remove();
                }
            });

            // Listen participant logic
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

                const preferenceRef = participantRef
                    .child(snap.key as string)
                    .child("preferences");

                preferenceRef.on("child_changed", (prefSnap: any) => {
                    dispatch(
                        updateParticipantField({
                            userId: snap.key as string,
                            field: prefSnap.key as keyof Participant,
                            value: prefSnap.val(),
                        })
                    );
                });

                dispatch(
                    addParticipant({ [snap.key as string]: { name, ...preferences } })
                );
            });

            participantRef.on("child_removed", (snap: any) => {
                dispatch(removeParticipant(snap.key as string));
            });
        };

        setup();
    }, []);

    useEffect(() => {
        const asyncFunc = async () => {
            // Get all videos and check if the live doesn't exist
            let liveExist = false;
            try {
                const videos = await getAllVideos();
                console.log(videos?.data?.data);
                videos?.data?.data?.forEach((video: Video) => {
                    if (video.title === `Live streaming from ${userName}`) liveExist = true;
                });

                // Creating the liveStream as a video in DB to show it to users
                console.log(true);
                if (!liveExist && user) {
                    const res = await createVideo({
                        title: `Live streaming from ${userName}`,
                        userId: `${user.id}`,
                        likes: 0,
                        dislikes: 0,
                        viewsCount: 0,
                        videoUrl: window.location.href, // ✅ dùng 'videoUrl' instead of 'videoURL'
                        status: "public",               // ✅ dùng 'status' instead of 'videoStatus'
                        thumbnail: "https://media.gettyimages.com/id/1306922705/vector/live-stream-banner.jpg?s=612x612&w=gi&k=20&c=5lgXBYQJSgo4QSRGeODWkpFUp915Nz7p9pKuKjrZ9Yw=",
                        duration: 0,                    
                        // publicPlaybackId: true        
                    });

                    if (res.status === 201) {
                        console.log("LIVE STREAM CREATED SUCCESSFULLY 🟩");
                        dispatch(setStreamId(res?.data?.id));
                    }
                }

            } catch (error) {
                console.error("Error fetching videos or creating live stream:", error);
            }
        };
        asyncFunc();
    }, [userName, dispatch]);

    return <MainScreen isStreamer />;
};

export default StreamerView;
