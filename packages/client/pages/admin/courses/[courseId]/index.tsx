import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Course, Lesson, Video } from '@/types';
import { axios } from '@/utils/axios';
import AdminCourseEditPage from '@/Components/Admin/AdminEditCourse';
import Layout from '@/Components/Layouts';
import { AuthContext } from '@/context/AuthContext';

export default function AdminEditCourse() {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)!;
    const router = useRouter();
    const { courseId } = router.query;

    const [course, setCourse] = useState<
        (Course & { lessons: (Lesson & { video: Video | null })[] }) | null
    >(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!courseId) return;
        if (authLoading) return;
        if (!isAuthenticated) return;

        const fetchCourse = async () => {
            try {
                const res = await axios.get(`/courses/user/${courseId}`);
                console.log({res})
                setCourse(res?.data);
            } catch (err) {
                console.error('Failed to fetch course:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId, authLoading, isAuthenticated]);


    if (authLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-blue-500"></div>
                    <span className="text-gray-700">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-red-600">Access Denied</h2>
                    <p className="mt-2 text-gray-600">You don&apos;t have permission to view this page.</p>
                    <a
                        href="/login"
                        className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Login
                    </a>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-gray-500">Course not found or you do not have permission.</p>
            </div>
        );
    }

    return (
        <Layout title="Edit a course" isWide>
            <AdminCourseEditPage course={course} />
        </Layout>
    );
}
