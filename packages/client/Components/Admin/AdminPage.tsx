import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { axios } from '@/utils/axios';
import { Course, Lesson, Video } from '@/types';
import CourseGrid from '@/Components/Course/CourseGrid';
import Button from '@/Components/Layouts/Button';
import { AuthContext } from '@/context/AuthContext';
import { ModalContext } from '@/context/ModalContext';
import { isAdmin } from '@/libs/admin';
import { CourseTable } from '../Course/CourseTable';
import { columns } from '../Course/CourseTable/columns';

export default function AdminPage() {
    const { authState: { isAuthenticated, user, authLoading } } = useContext(AuthContext)!;
    const { toggleModal } = useContext(ModalContext);
    const [courses, setCourses] = useState<
        (Course & { lessons: (Lesson & { video: Video | null })[] })[]
    >([])

    useEffect(() => {
        if (!user) return

        const loadCourses = async () => {
            const url = isAdmin(user.id)
                ? "/courses"
                : `/courses?authorId=${user.id}`
            const { data } = await axios.get(url)
            setCourses(data.data)
        }

        loadCourses()
    }, [user]);
    

    if (authLoading) {
        return (
            <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-[#F4A300]"></div>
                    <span className="text-[#F4A300]">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-[#F4A300]">Access Denied</h2>
                    <p className="mt-2 text-gray-300">You don&apos;t have permission to view this page.</p>
                    <button
                        onClick={() => toggleModal('login')}
                        className="mt-4 inline-block rounded bg-[#FFB347] px-4 py-2 text-white hover:bg-[#F5A028] cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* <h2>Your courses</h2> */}

            {courses.length > 0 ? (
                // <CourseGrid courses={courses} isAdmin isAuthenticated={isAuthenticated} />
                <CourseTable columns={columns} data={courses} />
            ) : (
                <div>
                    <h3 className="mt-2 text-gray-300">You don&apos;t have any courses yet.</h3>
                </div>
            )}

            {/* <Link href="/admin/courses">
                <Button className='mt-4 inline-block rounded bg-[#FFB347] px-4 py-2 text-white hover:bg-[#F5A028] cursor-pointer'>Create a course</Button>
            </Link> */}
        </>
    )
}