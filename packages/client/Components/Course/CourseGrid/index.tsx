import { Course, Lesson, Video } from '@/types';
import CourseCard from '@components/Course/CourseCard'

type Props = {
    isAdmin?: boolean;
    courses: (Course & {
        lessons: (Lesson & {
            video: Video | null;
        })[];
    })[]
}

const CourseGrid = ({ courses, isAdmin = false }: Props) => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} isAdmin={isAdmin} />
                ))}
            </div>
        </>
    );
};

export default CourseGrid;