import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Course, Lesson, Video } from '@/types';
import { axios } from '@/utils/axios';
import AdminCourseEditPage from '@/Components/Admin/AdminEditCourse';
import Layout from '@/Components/Layouts';
import { AuthContext } from '@/context/AuthContext';
import { ModalContext } from '@/context/ModalContext';

export default function AdminEditCourse() {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)!;
    const { toggleModal } = useContext(ModalContext)!;
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
                setLoading(true);
                const res = await axios.get(`/courses/user/${courseId}`);
                console.log({ res })
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
            <Layout title="Edit a course" isWide>
                <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-[#F4A300]"></div>
                        <span className="text-[#F4A300]">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!isAuthenticated) {
        return (
            <Layout title="Edit a course" isWide>
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
            </Layout>
        );
    }

    if (!course) {
        return (
            <Layout title="Edit a course" isWide>
                <div className="flex h-screen items-center justify-center">
                    <p className="text-gray-500">Course not found or you do not have permission.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Edit a course" isWide>
            <AdminCourseEditPage course={course} />
        </Layout>
    );
}
