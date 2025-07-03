import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { axios } from '@/utils/axios';
import { Course, Lesson, Video } from '@/types';
import CourseGrid from '@components/Course/CourseGrid';
import Button from '@components/Layouts/Button';
import { AuthContext } from '@context/AuthContext';

export default function AdminPage() {
    const { authState: { isAuthenticated, user, authLoading } } = useContext(AuthContext);
    console.log({ isAuthenticated, user })
    const [courses, setCourses] = useState<
        (Course & { lessons: (Lesson & { video: Video | null })[] })[]
    >([])

    useEffect(() => {
        if (!user) return

        const loadCourses = async () => {
            try {
                const { data } = await axios.get(`/courses?authorId=${user.id}`)
                setCourses(data)
            } catch (e) {
                console.log(e)
            }
        }

        loadCourses()
    }, [user])

    if (authLoading) return <p>Loading...</p>

    if (!user) return <p>Access Denied</p>

    return (
        <>
            {/* <h2>Your courses</h2> */}

            {courses.length > 0 ? (
                <CourseGrid courses={courses} isAdmin />
            ) : (
                <div>
                    <h3>You don&apos;t have any courses yet.</h3>
                </div>
            )}

            <Link href="/admin/courses">
                <Button>Create a course</Button>
            </Link>
        </>
    )
}