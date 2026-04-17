import React, { useState } from 'react';
import CourseLessonItem from '../CourseLessonItem';
import { Lesson } from '@/types';
import style from '../index.module.css';

// interface Props {
//     lessons: Lesson[];
//     onSelectLesson: (videoUrl: string, videoId: string) => void;
//     completedLessons: string[];
//     currentVideoId: string | null
// }

// const CourseLesson: React.FC<Props> = ({ lessons, onSelectLesson, completedLessons, currentVideoId }) => {
//     return (
//         <div>
//             {lessons.map(lesson => (
//                 <CourseLessonItem
//                     key={lesson.id}
//                     lesson={lesson}
//                     onClick={() => onSelectLesson(
//                         lesson.video?.videoUrl || '',
//                         lesson.video?.id || ''
//                     )}
//                     isCompleted={completedLessons.includes(lesson.id)}
//                     thumbnail={lesson.video?.thumbnail || ''}
//                     isActive={currentVideoId === lesson.video?.id}
//                 />
//             ))}
//         </div>
//     );
// };

interface Props {
    lessons: Lesson[];
    onSelectVideo: (videoUrl: string, videoId: string) => void; // Renamed for clarity
    completedVideoIds: string[]; // Changed from completedLessons to track specific videos
    currentVideoId: string | null;
}

const CourseLesson: React.FC<Props> = ({
    lessons,
    onSelectVideo,
    completedVideoIds,
    currentVideoId
}) => {
    // State to track which lesson is currently expanded
    const [expandedLessonId, setExpandedLessonId] = useState<string | null>(
        lessons.length > 0 ? lessons[0].id : null
    );

    const toggleLesson = (id: string) => {
        setExpandedLessonId(prev => (prev === id ? null : id));
    };

    return (
        <div className={style.accordionWrapper}>
            {lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className={style.lessonGroup}>
                    {/* --- LESSON HEADER --- */}
                    <div
                        className={`${style.lessonHeader} ${expandedLessonId === lesson.id ? style.activeHeader : ''}`}
                        onClick={() => toggleLesson(lesson.id)}
                    >
                        <div className={style.lessonInfo}>
                            <span className={style.lessonNumber}>Lesson {lessonIndex + 1}</span>
                            <h4 className={style.lessonName}>{lesson.name}</h4>
                        </div>
                        <span className={style.chevron}>
                            {expandedLessonId === lesson.id ? '▲' : '▼'}
                        </span>
                    </div>

                    {/* --- CHAPTERS (VIDEOS) LIST --- */}
                    {expandedLessonId === lesson.id && (
                        <div className={style.videoList}>
                            {/* {lesson.videos?.sort((a, b) => a.position - b.position).map((video, videoIndex) => {
                                const isActive = currentVideoId === video.id;
                                const isCompleted = completedVideoIds.includes(video.id);

                                return (
                                    <div 
                                        key={video.id}
                                        className={`${style.videoItem} ${isActive ? style.activeVideo : ''}`}
                                        onClick={() => onSelectVideo(video.videoUrl || '', video.id)}
                                    >
                                        <div className={style.videoMain}>
                                            <div className={style.statusIcon}>
                                                {isCompleted ? '✅' : '▶'}
                                            </div>
                                            <p className={style.videoTitle}>
                                                {lessonIndex + 1}.{videoIndex + 1} {video.title}
                                            </p>
                                        </div>
                                        {video.duration && (
                                            <span className={style.duration}>
                                                {Math.floor(video.duration / 60)}m
                                            </span>
                                        )}
                                    </div>
                                );
                            })} */}
                            {lesson.videos.map((video, vIdx) => (
                                <CourseLessonItem
                                    key={video.id}
                                    video={video}
                                    lessonIndex={lessonIndex} // from parent map
                                    videoIndex={vIdx}
                                    onSelect={() => onSelectVideo(video.videoUrl, video.id)}
                                    isCompleted={completedVideoIds.includes(video.id)}
                                    isActive={currentVideoId === video.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CourseLesson;