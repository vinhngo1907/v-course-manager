'use client';

import React, { useState, useEffect } from 'react';
import { axios } from "@/utils/axios";
import style from '../index.module.css';
import { Lesson, Video } from '@/types';

// interface Props {
//     lesson: Lesson;
//     onClick: () => void;
//     isCompleted: boolean;
//     thumbnail?: string;
//     isActive?: boolean;
// }

// const CourseLessonItem: React.FC<Props> = ({
//     lesson, onClick,
//     isCompleted, thumbnail, isActive
// }) => {
//     const [completed, setCompleted] = useState(isCompleted);

//     const handleCheckClick = async (e: React.MouseEvent) => {
//         e.stopPropagation();

//         try {
//             console.log({ completed })
//             if (completed) {
//                 await axios.delete(`/video/lesson/${lesson.id}/progress`);
//             } else {
//                 await axios.post(`/video/lesson/${lesson.id}/progress`);
//             }
//             setCompleted(!completed);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <div
//             // className={style.courseLessionItem}
//             className={`${style.courseLessionItem} ${isActive ? style.courseLessionItemActive : ''}`}
//             onClick={onClick}>
//             {thumbnail && (
//                 <div className={style.thumbnailWrap}>
//                     <img
//                         src={thumbnail}
//                         alt={lesson.name}
//                         className={style.courseLessionItemThumbnail}
//                         width={106}
//                         height={60}
//                     />
//                     <button
//                         className={style.courseLessionItemChecked}
//                         onClick={handleCheckClick}
//                     >
//                         {completed ? '✓' : ''}
//                     </button>
//                 </div>
//             )}
//             <div className="infor">
//                 <div className={style.courseLessionItemTitle}>{lesson.name}</div>
//                 <div className={style.courseLessionItemLecture}>
//                     <span>{lesson.name}</span>
//                     {lesson.video?.duration && (
//                         <span className={style.Duration}>
//                             • {Math.round(lesson.video.duration / 60)} min
//                         </span>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

interface Props {
    video: Video;
    lessonIndex: number;
    videoIndex: number;
    onSelect: () => void;
    isCompleted: boolean;
    isActive?: boolean;
}

const CourseLessonItem: React.FC<Props> = ({
    video,
    lessonIndex,
    videoIndex,
    onSelect,
    isCompleted,
    isActive
}) => {
    const [completed, setCompleted] = useState(isCompleted);

    // Sync state if props change (e.g., when switching courses)
    useEffect(() => {
        setCompleted(isCompleted);
    }, [isCompleted]);

    const handleCheckClick = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the video play (onSelect)

        try {
            if (completed) {
                // Assuming your NestJS endpoint follows the Video ID now
                await axios.delete(`/video/${video.id}/progress`);
            } else {
                await axios.post(`/video/${video.id}/progress`);
            }
            setCompleted(!completed);
        } catch (err) {
            console.error("Failed to update progress:", err);
        }
    };

    return (
        <div
            className={`${style.courseLessionItem} ${isActive ? style.courseLessionItemActive : ''}`}
            onClick={onSelect}
        >
            <div className={style.thumbnailWrap}>
                {video.thumbnail ? (
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className={style.courseLessionItemThumbnail}
                        width={106}
                        height={60}
                    />
                ) : (
                    /* Fallback if no thumbnail: show a play icon placeholder */
                    <div className="w-[106px] h-[60px] bg-gray-800 flex items-center justify-center rounded">
                        <span className="text-gray-500 text-xs">Chapter {videoIndex + 1}</span>
                    </div>
                )}
                
                <button
                    className={`${style.courseLessionItemChecked} ${completed ? style.checked : ''}`}
                    onClick={handleCheckClick}
                >
                    {completed ? '✓' : ''}
                </button>
            </div>

            <div className={style.infor}>
                {/* Displaying as "1.2 Chapter Title" */}
                <div className={style.courseLessionItemTitle}>
                   {lessonIndex + 1}.{videoIndex + 1} {video.title}
                </div>
                
                <div className={style.courseLessionItemLecture}>
                    {video.duration && (
                        <span className={style.Duration}>
                            {Math.round(video.duration / 60)} min
                        </span>
                    )}
                    {isActive && <span className="ml-2 text-yellow-500 text-[10px] uppercase font-bold">● Playing</span>}
                </div>
            </div>
        </div>
    );
};

export default CourseLessonItem;