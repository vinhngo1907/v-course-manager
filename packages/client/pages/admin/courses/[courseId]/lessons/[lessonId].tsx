import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { ModalContext } from "@/context/ModalContext";
import { axios } from "@/utils/axios";
import type { Lesson, Video } from "@/types";
// import LessonForm from "@/Components/Lesson";
import LessonForm, { Inputs } from "@/Components/Lesson";
// import MuxPlayer from "@mux/mux-player-react/lazy";
// import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import type { SubmitHandler } from "react-hook-form";
// import VideoViewer from "@/Components/Video/VideoViewer";
import Layout from "@/Components/Layouts";
import Loading from "@/Components/Loading";
import AdminLessonEditPage from "@/Components/Admin/AdminEditLesson";


export default function AdminEditLesson() {
    const { authState: { isAuthenticated, authLoading } } = useContext(AuthContext)!;
    const router = useRouter();

    const { courseId, lessonId } = router.query;
    // console.log({ courseId, lessonId })

    const { toggleModal } = useContext(ModalContext)!;

    const [lesson, setLesson] = useState<Lesson & { videos: Video[] | [] } | null>(null);

    useEffect(() => {
        if (!lessonId) return;
        if (authLoading) return;

        if (!isAuthenticated) {
            toggleModal('login');
            return;
        }

        const fetchLesson = async () => {
            try {
                const res = await axios.get(`/lessons/${lessonId}/chapters`);
                console.log({Chapter: res.data })
                setLesson(res.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch lesson");
            } 
        };

        fetchLesson();
    }, [lessonId, authLoading, isAuthenticated]);

    // const updateLesson = (data: Inputs) => {
    //     return axios.put(`/video/lesson/${lessonId}`, data);
    // };

    // const deleteLesson = () => {
    //     return axios.delete(`/video/lesson/${lessonId}`);
    // };

    // const updateMutation = useMutation({
    //     mutationFn: updateLesson,
    //     onSuccess: () => {
    //         toast.success("Lesson updated successfully");
    //     },
    //     onError: (error) => {
    //         console.error(error);
    //         toast.error("Something went wrong");
    //     }
    // });

    // const deleteMutation = useMutation({
    //     mutationFn: deleteLesson,
    //     onSuccess: () => {
    //         if (lesson) {
    //             console.log({ lesson });
    //             router.push(`/admin/courses/${lesson.courseId}`);
    //         } else {
    //             router.push(`/admin/courses`);
    //         }
    //         toast.success("Lesson deleted successfully");
    //     },
    //     onError: (error) => {
    //         console.error(error);
    //         toast.error("Something went wrong");
    //     }
    // });

    // const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //     updateMutation.mutate(data);
    // };

    if (authLoading) return (<Loading />)

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

    if (!courseId || !lessonId || !lesson) {
        return null;
    }
   
    return (
        <Layout title="Chapter creation" isWide>
            <AdminLessonEditPage courseId={courseId} lesson={lesson}/>
        </Layout>
    );
}