import React from 'react';
import CourseLessonItem from '../CourseLessonItem';
import { Lesson } from '@/types';

interface Props {
    lessons: Lesson[];
    onSelectLesson: (videoUrl: string, videoId: string) => void;
    completedLessons: string[];
    currentVideoId: string | null
}

const CourseLesson: React.FC<Props> = ({ lessons, onSelectLesson, completedLessons, currentVideoId }) => {
    return (
        <div>
            {lessons.map(lesson => (
                <CourseLessonItem
                    key={lesson.id}
                    lesson={lesson}
                    onClick={() => onSelectLesson(
                        lesson.video?.videoUrl || '',
                        lesson.video?.id || ''
                    )}
                    isCompleted={completedLessons.includes(lesson.id)}
                    thumbnail={lesson.video?.thumbnail || ''}
                    isActive={currentVideoId === lesson.video?.id}
                />
            ))}
        </div>
    );
};

export default CourseLesson;