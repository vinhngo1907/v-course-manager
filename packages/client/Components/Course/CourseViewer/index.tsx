import React, { useState } from 'react';
import { Course, Lesson } from '@/types'


export default function CourseViewer({
    course,
    lessonProgress,
    setLessonProgress
}: {
    course: Course
    lessonProgress: string[]
    setLessonProgress: (ids: string[]) => void
}) {
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(
        course.lessons[0] || null
    )

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Left: Video */}
            <div className="flex-1">
                {currentLesson?.video ? (
                    <>
                        <video
                            src={currentLesson.video.videoUrl}
                            poster={currentLesson.video.thumbnail}
                            controls
                            className="w-full rounded shadow"
                        />

                        <h2 className="mt-4 text-2xl font-bold">{currentLesson.name}</h2>
                        <p className="text-gray-700">{currentLesson.description}</p>
                    </>
                ) : (
                    <p>No video for this lesson.</p>
                )}
            </div>

            {/* Right: Lessons list */}
            <div className="w-full md:w-1/3 border-l md:pl-6">
                <h3 className="text-xl font-semibold mb-4">Lessons</h3>

                <div className="space-y-4">
                    {course.lessons.map((lesson: Lesson) => (
                        <button
                            key={lesson.id}
                            onClick={() => setCurrentLesson(lesson)}
                            className={`block w-full text-left p-4 border rounded ${currentLesson?.id === lesson.id ? 'border-blue-600 bg-blue-50' : ''
                                }`}
                        >
                            <h4 className="font-medium">{lesson.name}</h4>
                            <p className="text-sm text-gray-500">{lesson.description}</p>

                            {lessonProgress.includes(lesson.id) ? (
                                <span className="text-green-600 text-xs font-medium">✓ Completed</span>
                            ) : (
                                <span className="text-gray-400 text-xs">Not completed</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
