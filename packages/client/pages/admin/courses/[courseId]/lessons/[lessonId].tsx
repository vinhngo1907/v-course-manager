import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { ModalContext } from "@/context/ModalContext";
import { axios } from "@/utils/axios";
import type { Lesson, Video } from "@/types";
import LessonForm, { Inputs } from "@/Components/Course/CourseForm/LessonForm";
// import MuxPlayer from "@mux/mux-player-react/lazy";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { SubmitHandler } from "react-hook-form";
import Button from "@/Components/Layouts/Button";
import VideoViewer from "@/Components/Video/VideoViewer";
import Layout from "@/Components/Layouts";
import Loading from "@/Components/Loading";

export default function AdminEditLesson() {
    const router = useRouter();
    const { lessonId } = router.query;

    const { authState: { isAuthenticated, authLoading } } = useContext(AuthContext)!;
    const { toggleModal } = useContext(ModalContext)!;

    const [lesson, setLesson] = useState<Lesson & { video: Video | null } | null>(null);

    useEffect(() => {
        if (!lessonId) return;
        if (authLoading) return;

        if (!isAuthenticated) {
            toggleModal('login');
            return;
        }

        const fetchLesson = async () => {
            try {
                const res = await axios.get(`/video/lesson/${lessonId}`);
                console.log({ res })
                setLesson(res.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch lesson");
            }
        };

        fetchLesson();
    }, [lessonId, authLoading, isAuthenticated]);

    const updateLesson = (data: Inputs) => {
        return axios.put(`/video/lesson/${lessonId}`, data);
    };

    const deleteLesson = () => {
        return axios.delete(`/video/lesson/${lessonId}`);
    };

    const updateMutation = useMutation({
        mutationFn: updateLesson,
        onSuccess: () => {
            toast.success("Lesson updated successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteLesson,
        onSuccess: () => {
            if (lesson) {
                console.log({ lesson });
                router.push(`/admin/courses/${lesson.courseId}`);
            } else {
                router.push(`/admin/courses`);
            }
            toast.success("Lesson deleted successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong");
        }
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        updateMutation.mutate(data);
    };

    if (authLoading) return (<Loading />)
    if (!lesson) {
        return (
            <Layout title="Edit a lesson" isWide>
                <div className="flex h-screen">
                    <p className="text-red-500">Lesson not found or you do not have permission.</p>
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
    return (
        <Layout title="Edit a lesson" isWide>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                    {
                        // lesson.video?.status === "ready" && 

                        lesson &&
                            lesson.video?.videoUrl ? (
                            <VideoViewer urlVideo={lesson.video?.videoUrl || ''} />
                        ) : (
                            <div className='mb-6 w-full aspect-video bg-gray-200' />
                        )}

                    <Button intent="danger" onClick={() => deleteMutation.mutate()}>
                        Delete this lesson
                    </Button>
                </div>
                <div>
                    <LessonForm
                        lesson={lesson}
                        onSubmit={onSubmit}
                        isLoading={updateMutation.isPending}
                    />
                </div>
            </div>
        </Layout>
    );
}