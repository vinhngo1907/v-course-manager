'use client';

import React, { useState } from 'react';
import { axios } from "@/utils/axios";
import style from '../index.module.css';
import { Lesson } from '@/types';

interface Props {
    lesson: Lesson;
    onClick: () => void;
    isCompleted: boolean;
    thumbnail?: string;
    isActive?: boolean;
}

const CourseLessonItem: React.FC<Props> = ({
    lesson, onClick,
    isCompleted, thumbnail, isActive
}) => {
    const [completed, setCompleted] = useState(isCompleted);

    const handleCheckClick = async (e: React.MouseEvent) => {
        e.stopPropagation();

        try {
            console.log({ completed })
            if (completed) {
                await axios.delete(`/video/lesson/${lesson.id}/progress`);
            } else {
                await axios.post(`/video/lesson/${lesson.id}/progress`);
            }
            setCompleted(!completed);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            // className={style.courseLessionItem}
            className={`${style.courseLessionItem} ${isActive ? style.courseLessionItemActive : ''}`}
            onClick={onClick}>
            {thumbnail && (
                <div className={style.thumbnailWrap}>
                    <img
                        src={thumbnail}
                        alt={lesson.name}
                        className={style.courseLessionItemThumbnail}
                        width={106}
                        height={60}
                    />
                    <button
                        className={style.courseLessionItemChecked}
                        onClick={handleCheckClick}
                    >
                        {completed ? '✓' : ''}
                    </button>
                </div>
            )}
            <div className="infor">
                <div className={style.courseLessionItemTitle}>{lesson.name}</div>
                <div className={style.courseLessionItemLecture}>
                    <span>{lesson.name}</span>
                    {lesson.video?.duration && (
                        <span className={style.Duration}>
                            • {Math.round(lesson.video.duration / 60)} min
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseLessonItem;