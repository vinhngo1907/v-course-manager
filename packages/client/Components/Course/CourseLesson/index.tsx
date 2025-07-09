import React from 'react';
import CourseLessonItem from '../CourseLessonItem';
import { Lesson } from '@/types';

interface Props {
    lessons: Lesson[];
    onSelectLesson: (videoUrl: string) => void;
    completedLessons: string[];
}

const CourseLesson: React.FC<Props> = ({ lessons, onSelectLesson, completedLessons }) => {
    console.log({lessons})
    return (
        <div>
            {lessons.map(lesson => (
                <CourseLessonItem
                    key={lesson.id}
                    lesson={lesson}
                    onClick={() => onSelectLesson(lesson.video?.videoUrl || '')}
                    isCompleted={completedLessons.includes(lesson.id)}
                />
            ))}
        </div>
    );
};

export default CourseLesson;