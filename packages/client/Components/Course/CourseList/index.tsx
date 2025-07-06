import React, { useContext, useEffect, useState } from 'react';
import styles from '../index.module.css';
import { useRouter } from 'next/router';
import { Course } from '@/types';
import CourseCard from '../CourseCard';
import { AuthContext } from '@/context/AuthContext';

interface Props {
    courses: Course[];
}

const CourseList: React.FC<Props> = ({ courses }) => {
    const {authState: {user}} = useContext(AuthContext)!
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        if(user && user.role.toLowerCase() === "admin"){
            setIsAdmin(true)
        }
    },[user, setIsAdmin])

    if (!courses || courses.length === 0) {
        return <p className="text-gray-500">No courses found.</p>;
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${styles.courseList}`}>
            {courses.map((course) => (
               
                // <div
                //     key={course.id}
                //     className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                //     onClick={() => router.push(`/course/${course.id}`)}
                // >
                //     <div className="relative w-full h-48">
                //         {/* <Image
                //             src={course.thumbnail}
                //             alt={course.title}
                //             layout="fill"
                //             objectFit="cover"
                //         /> */}
                //         <img src={course.thumbnail} alt={course.title} style={{
                //             objectFit: "cover",
                //         }}/>
                //     </div>
                //     <div className="p-4">
                //         <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                //         <p className="text-gray-600">{course.description}</p>
                //     </div>
                // </div>

                 <CourseCard key={course.id} course={course} isAdmin={isAdmin} />
           ))}
        </div>
    );
};

export default CourseList;
