import React, { useEffect } from "react";
import MainScreen from "@/Components/MainScreen";
import { db } from "@/streamingServer/firebase";
import { useDispatch } from "react-redux";
import {
    addParticipant,
    setStreamer,
    removeParticipant,
    updateParticipantField,
    Participant,
} from "@/redux/features/liveVideoStreamingSlice";
import { AppDispatch } from "@/redux/store";

const ParticipantView: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const urlparams = new URLSearchParams(window.location.search);
        const roomId = urlparams.get("id");

        let firepadRef = db.ref();
        if (roomId) {
            firepadRef = firepadRef.child(roomId);
        }

        const participantRef = firepadRef.child("participants");

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
    }, []);

    return <MainScreen isStreamer={false} />;
};

export default ParticipantView;


// import React, { useEffect } from "react";
// import MainScreen from "@/Components/MainScreen";
// import { db } from "@/streamingServer/firebase";
// import { useDispatch } from "react-redux";
// import {
//     addParticipant,
//     setStreamer,
//     removeParticipant,
//     updateParticipantField,
//     Participant,
// } from "@/redux/features/liveVideoStreamingSlice";
// import { AppDispatch } from "@/redux/store";

// const ParticipantView: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();

//     useEffect(() => {
//         if (typeof window === "undefined") return;

//         const urlparams = new URLSearchParams(window.location.search);
//         const roomId = urlparams.get("id");

//         let firepadRef = db.ref();
//         if (roomId) {
//             firepadRef = firepadRef.child(roomId);
//         }

//         const participantRef = firepadRef.child("participants");

//         participantRef.on("child_added", (snap: any) => {
//             const { userName: name, preferences = {} } = snap.val();
//             participantRef
//                 .orderByChild("timestamp")
//                 .limitToFirst(1)
//                 .once("value")
//                 .then((snapshot: any) => {
//                     const firstElement = snapshot.val();
//                     dispatch(setStreamer(firstElement));
//                 });

//             const preferenceRef = participantRef
//                 .child(snap.key as string)
//                 .child("preferences");

//             preferenceRef.on("child_changed", (prefSnap: any) => {
//                 dispatch(
//                     updateParticipantField({
//                         userId: snap.key as string,
//                         field: prefSnap.key as keyof Participant,
//                         value: prefSnap.val(),
//                     })
//                 );
//             });

//             dispatch(
//                 addParticipant({ [snap.key as string]: { name, ...preferences } })
//             );
//         });

//         participantRef.on("child_removed", (snap: any) => {
//             dispatch(removeParticipant(snap.key as string));
//         });
//     }, []);

//     return <MainScreen isStreamer={false} />;
// };

// export default ParticipantView;
