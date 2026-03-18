import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import LessonForm, { Inputs } from "../Lesson";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "@/utils/axios";
// import { useRouter } from "next/navigation";
import { Lesson, Video as Chapter, MuxData } from "@/types";
import { AuthContext } from "@/context/AuthContext";
// import VideoViewer from "../Video/VideoViewer";
import { Banner } from "../Banner";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Video } from "lucide-react";
import ChapterActions from "@/pages/admin/courses/[courseId]/lessons/_components/chapter-actions";
import { IconBadge } from "../Icon";
import { ChapterVideoForm } from "@/pages/admin/courses/[courseId]/lessons/_components/chapter-video-form";
// import Heading from "../Course/Heading";

interface AdminLessonEditPageProps {
    courseId: string | string[] | undefined;
    lesson: (Lesson & { videos: Chapter[] | [] })
}
const AdminLessonEditPage = ({ courseId, lesson }: AdminLessonEditPageProps) => {
    const lessonId = lesson.id;
    if (!courseId || !lessonId) return;
    const [chapter, setChapter] = useState<Chapter & { muxData: MuxData | null } | null>(null);
    const [adding,setAdding]= useState(false);
    // useEffect(() => {
    //     // if (!lessonId) return;
    //     // if (authLoading) return;

    //     // if (!isAuthenticated) {
    //     //     toggleModal('login');
    //     //     return;
    //     // }

    //     const fetchLesson = async () => {
    //         try {
    //             const res = await axios.get(`/video/chapter/${lessonId}`);
    //             console.log({ Chapter: res.data })
    //             setChapter(res.data);
    //         } catch (error) {
    //             console.error('Failed to fetch chapter:', error);
    //         } finally {
    //             toast.error("Something went wrong!");
    //         }
    //     };

    //     fetchLesson();
    // }, [lessonId, authLoading, isAuthenticated]);

    const updateLesson = (data: Inputs) => {
        return axios.put(`/video/lesson/${lessonId}`, data);
    };

    // const deleteLesson = () => {
    //     return axios.delete(`/video/lesson/${lessonId}`);
    // };

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

    const requiredFields = [
        lesson.name,
        lesson.description,
        lesson.video?.videoUrl,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;

    /*
       The isComplete will be set to true if every requiredFields have truthy value
   */
    const isComplete = requiredFields.every(Boolean);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        updateMutation.mutate(data);
    };
    return (
        <>
            {!lesson.published && (
                <Banner
                    variant="warning"
                    label="This chapter is unpublished. It will not be visible in the course"
                />
            )}
            <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
                <div className="w-full">
                    <Link href={`/admin/courses/${courseId}`}
                        className="text-white flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to course setup
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            {/* <Heading as="h1">
                                Chapter Creation
                            </Heading> */}
                            <span className="text-white text-sm text-slate-700">
                                Complete all fields {completionText}
                            </span>
                        </div>
                        <ChapterActions
                            disabled={!isComplete}
                            courseId={courseId}
                            lessonId={lessonId}
                            published={lesson.published}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-x-2">
                                    <IconBadge icon={LayoutDashboard} />
                                    <h2 className="text-xl">Customize your chapter</h2>
                                </div>
                                <LessonForm
                                    courseId={courseId as string}
                                    lesson={lesson}
                                    onSubmit={onSubmit}
                                    isLoading={updateMutation.isPending}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Video} />
                                <h2 className="text-xl">Add a video</h2>
                            </div>
                            {lesson.videos.length > 0 ? 
                            lesson.videos.map((video) => (
                                <ChapterVideoForm
                                    key={video.id}
                                    initialData={video}
                                    lessonId={lessonId}
                                    courseId={courseId}
                                />
                            )): (
                                  <ChapterVideoForm
                                        initialData={chapter}
                                        lessonId={lessonId}
                                        courseId={courseId}
                                    />
                            )}
                            
                            {/* {
                                chapter && (
                                    <ChapterVideoForm
                                        initialData={chapter}
                                        lessonId={lessonId}
                                        courseId={courseId}
                                    />
                                )
                            } */}
                        </div>
                    </div>
                    {/* {
                        lesson &&
                            lesson.video?.videoUrl ? (
                            <VideoViewer urlVideo={lesson.video?.videoUrl || ''} />
                        ) : (
                            <div className='mb-6 w-full aspect-video bg-gray-200' />
                        )} */}

                    {/* <Button intent="danger" onClick={() => deleteMutation.mutate()}>
                        Delete this lesson
                    </Button> */}
                </div>
            </div>
        </>
    )
}

export default AdminLessonEditPage