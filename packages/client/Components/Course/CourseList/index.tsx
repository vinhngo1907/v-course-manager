import React, { useContext, useEffect, useState } from 'react';
import styles from '../index.module.css';
import { Course } from '@/types';
import CourseCard from '../CourseCard';
import { AuthContext } from '@/context/AuthContext';

interface Props {
    courses: Course[];
}

const CourseList: React.FC<Props> = ({ courses }) => {
    const { authState: { user } } = useContext(AuthContext)!
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user && user.role.toLowerCase() === "admin") {
            setIsAdmin(true)
        }
    }, [user, setIsAdmin])

    if (!courses || courses.length === 0) {
        return <p className="text-gray-500">No courses found.</p>;
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${styles.courseList}`}>
            {courses.map((course) => (

                <CourseCard key={course.id} course={course} isAdmin={isAdmin} forcePublic/>
            ))}
        </div>
    );
};

export default CourseList;
