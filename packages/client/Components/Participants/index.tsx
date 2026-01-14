// import React, { useEffect, useState } from "react";
// import Card from "@/Components/Course/CourseCard";
// import "./index.module.css";
// import {
//     FaBan,
//     FaMicrophoneSlash,
//     FaRegCopy,
//     FaRegStopCircle,
// } from "react-icons/fa";
// import { deleteVideo } from "@/services/video";
// import { useAppSelector } from "@/redux/store";
// import { getFirepadRef } from "@/streamingServer/firebase";
// import CardLiveStream from "@/Components/LiveStream/CardLiveStream";

// const Participant = (props: any) => {
//     const [firepadRef, setFirepadRef] = useState<any>(null);

//     const isStreamer = useAppSelector(
//         (state) => state.liveVideoStreaming.isStreamer
//     );
//     const streamId = useAppSelector(
//         (state) => state.liveVideoStreaming.streamId
//     );

//     const {
//         curentIndex,
//         currentParticipant,
//         hideVideo,
//         videoRef,
//         showAvatar,
//         currentUser,
//         clearStreamData,
//         showStreamerControls,
//         streamInfos,
//     } = props;

//     // No participant, nothing to show
//     if (!currentParticipant) return <></>;

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             const ref = getFirepadRef();
//             if (!ref) {
//                 console.error("firepadRef is undefined — must run on client side!");
//                 return;
//             }
//             setFirepadRef(ref);

//             if (isStreamer) {
//                 window.onunload = (e) => {
//                     e.preventDefault();
//                     ref.remove().then(() => {
//                         console.log("All data removed successfully.");
//                     });
//                 };

//                 window.onbeforeunload = (e) => {
//                     e.preventDefault();
//                     e.returnValue = "";
//                     console.log(streamId);

//                     if (streamId) {
//                         deleteVideo(streamId).then((res) => console.log(res));
//                     }
//                 };
//             }
//         }
//     }, [isStreamer, streamId]);

//     return (
//         <div
//             className={`participant ${hideVideo ? "hide" : ""} flex flex-wrap`}
//         >
//             {/* Demo CardLiveStream */}
//             <CardLiveStream
//                 streamTitle="My Cool Live Stream"
//                 streamerName="StreamerName"
//                 viewerCount={123}
//                 thumbnailUrl="https://source.unsplash.com/random/400x300"
//             />

//             <div className="fixed left-[-120px] flex justify-center items-center gap-2 transition-all duration-300">
//                 <div className="participantsList flex flex-col bg-pink-400 px-4 py-2 rounded-r-md border-white border-[1px] overflow-auto">
//                     {Object.keys(streamInfos?.uniqueCountedParticipants)?.map(
//                         (participant, index) => (
//                             <div
//                                 className="text-white bg-pink-700 px-2 py-1 rounded my-[2px] border-pink-900 border-[1px]"
//                                 key={index}
//                             >
//                                 ({streamInfos?.uniqueCountedParticipants[participant]}){" "}
//                                 {participant}
//                             </div>
//                         )
//                     )}
//                 </div>

//                 <button
//                     className="text-white font-medium bg-pink-600 hover:bg-pink-800 rounded-md px-2 py-1 transition-all border-pink-600 border-2"
//                     onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
//                         const btn = e.currentTarget;
//                         const parent = btn.parentElement as HTMLElement;

//                         if (parent.style.left === "-120px") {
//                             btn.innerHTML = "X";
//                             parent.style.left = "-1px";
//                         } else {
//                             parent.style.left = "-120px";
//                             btn.innerHTML = "Participants list";
//                         }
//                     }}
//                 >
//                     Participants list
//                 </button>

//                 {showStreamerControls && (
//                     <div className="flex fixed right-[2%]">
//                         <button
//                             onClick={() => {
//                                 const confirmEnding = window.confirm(
//                                     "Are you sure you want to end the live 🟥"
//                                 );
//                                 if (confirmEnding && streamId) {
//                                     clearStreamData();
//                                     deleteVideo(streamId).then((res) =>
//                                         console.log(res)
//                                     );
//                                     window.location.replace("/");
//                                 }
//                             }}
//                             className="text-white bg-red-600 hover:bg-red-800 rounded-md ml-4 px-2 py-1 border-red-600 border-2"
//                         >
//                             <FaRegStopCircle size={22} />
//                         </button>
//                         <button
//                             className="text-white bg-green-600 hover:bg-green-800 rounded-md ml-4 px-2 py-1 border-green-600 border-2"
//                             onClick={() => {
//                                 let url = document.location.href;
//                                 navigator.clipboard.writeText(url).then(
//                                     function () {
//                                         window.alert("Link Copied!");
//                                     },
//                                     function () {
//                                         window.alert("Copy error");
//                                     }
//                                 );
//                             }}
//                         >
//                             <FaRegCopy size={22} />
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Participants;

import React, { useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/store";
import { Track } from "livekit-client";

interface Props {
    identity: string;
    name: string;
    videoEnabled: boolean;
    audioEnabled: boolean;
    isLocal?: boolean;
    videoTrack?: Track;
}

const ParticipantItem: React.FC<Props> = ({
    name,
    identity,
    videoEnabled,
    audioEnabled,
    isLocal,
    videoTrack,
}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Attach/detach track
    useEffect(() => {
        if (videoTrack && videoRef.current) {
            videoTrack.attach(videoRef.current);
        }

        return () => {
            if (videoTrack && videoRef.current) {
                videoTrack.detach(videoRef.current);
            }
        };
    }, [videoTrack]);

    return (
        <div className="relative bg-black border border-gray-700 rounded-xl overflow-hidden w-[250px] h-[180px]">
            {videoEnabled && videoTrack ? (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted={isLocal}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-800">
                    No Camera
                </div>
            )}

            {/* Name + status icons */}
            <div className="absolute bottom-2 left-2 bg-black/60 px-3 py-1 rounded text-white text-sm flex items-center gap-2">
                <span>{name || identity}</span>

                {!audioEnabled && <span>🔇</span>}
                {!videoEnabled && <span>📷❌</span>}
            </div>
        </div>
    );
};

export default function Participants() {
    const participants = useAppSelector(
        (state) => state.liveVideoStreaming.participants
    );

    const list = Object.values(participants);

    return (
        <div className="p-4 flex flex-wrap gap-4">
            {list.length === 0 && (
                <div className="text-gray-400 text-lg">No participants</div>
            )}

            {list.map((p) => (
                <ParticipantItem
                    key={p.identity}
                    identity={p.identity}
                    name={p.name}
                    videoEnabled={p.videoEnabled}
                    audioEnabled={p.audioEnabled}
                    isLocal={p.isLocal}
                    videoTrack={(p as any).videoTrack} 
                />
            ))}
        </div>
    );
}
