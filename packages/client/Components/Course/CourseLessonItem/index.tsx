import React from 'react';
import style from '../index.module.css';
import { Lesson } from '@/types';

interface Props {
    lesson: Lesson;
    onClick: () => void;
    isCompleted: boolean;
    thumbnail?: string;
}

const CourseLessonItem: React.FC<Props> = ({ lesson, onClick, isCompleted, thumbnail }) => {
    return (
        <div className={style.courseLessionItem} onClick={onClick}>
            {thumbnail && (
                <img
                    src={thumbnail}
                    alt={lesson.name}
                    className={style.courseLessionItemThumbnail}
                    width={106}
                    height={60}
                />
            )}
            <div className={style.courseLessionItemChecked}>
                {isCompleted ? '✓' : ''}
            </div>
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