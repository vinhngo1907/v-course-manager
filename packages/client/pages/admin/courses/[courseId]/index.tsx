import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Category, Course, Lesson, Video } from '@/types';
import { axios } from '@/utils/axios';
import AdminCourseEditPage from '@/Components/Admin/AdminEditCourse';
import Layout from '@/Components/Layouts';
import { AuthContext } from '@/context/AuthContext';
// import { ModalContext } from '@/context/ModalContext';

export default function AdminEditCourse() {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)!;
    // const { toggleModal } = useContext(ModalContext)!;
    const router = useRouter();
    const { courseId } = router.query;

    const [course, setCourse] = useState<
        (Course & { lessons: (Lesson & { video: Video | null })[] }) | null
    >(null);
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!courseId) return;
        if (authLoading) return;
        if (!isAuthenticated) return;

        const fetchCourse = async () => {
            try {
                setLoading(true);
                const [courseRes, catRes] = await Promise.all([
                    axios.get(`/courses/user/${courseId}`),
                    axios.get('/categories'),
                ]);
                setCourse(courseRes?.data);
                setCategories(catRes.data.data);
            } catch (err) {
                console.error('[ERR_FETCH_COURSE_CAT]:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId, authLoading, isAuthenticated]);


    if (authLoading || loading || !course || !categories) {
        return (
            <Layout title="Course setup" isWide>
                <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-[#F4A300]"></div>
                        <span className="text-[#F4A300]">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    // if (!isAuthenticated) {
    //     return (
    //         <Layout title="Course setup" isWide>
    //             <div className="flex items-center justify-center">
    //                 <div className="text-center">
    //                     <h2 className="text-3xl font-semibold text-[#F4A300]">Access Denied</h2>
    //                     <p className="mt-2 text-gray-300">You don&apos;t have permission to view this page.</p>
    //                     <button
    //                         onClick={() => toggleModal('login')}
    //                         className="mt-4 inline-block rounded bg-[#FFB347] px-4 py-2 text-white hover:bg-[#F5A028] cursor-pointer"
    //                     >
    //                         Login
    //                     </button>
    //                 </div>
    //             </div>
    //         </Layout>
    //     );
    // }

    if (!course) return null;
    
    return (
        <Layout title="Course setup" isWide>
            <AdminCourseEditPage course={course} categories={categories}/>
        </Layout>
    );
}
