import React from 'react';
import style from '../index.module.css';
import { Lesson } from '@/types';

interface Props {
    lesson: Lesson;
    onClick: () => void;
    isCompleted: boolean;
}

const CourseLessonItem: React.FC<Props> = ({ lesson, onClick, isCompleted }) => {
    return (
        <div className={style.courseLessionItem} onClick={onClick}>
            <div className={style.courseLessionItemChecked}>
                {isCompleted ? '✓' : ''}
            </div>
            <div className="infor">
                <div className={style.courseLessionItemTitle}>{lesson.name}</div>
                <div className={style.courseLessionItemLecture}>
                    <span>{lesson.name}</span>
                    <span className={style.Duration}>• {Math.round(lesson.video.duration / 60)} min</span>
                </div>
            </div>
        </div>
    );
};

export default CourseLessonItem;