import CourseForm, { Inputs } from "@/Components/Course/CourseForm";
import Heading from "@/Components/Course/Heading";
import { Category, Course, Lesson, Video } from "@/types";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { axios } from "@/utils/axios";
import { IconBadge } from "../Icon";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { Actions } from "@/pages/admin/courses/[courseId]/_components/actions";
import { ChaptersForm } from "@/pages/admin/courses/[courseId]/_components/chapters-form";
import { Banner } from "../Banner";

type CourseUpdateResult = {
    id: string;
};

type AdminCourseEditPageProps = {
    course: Course & {
        lessons: (Lesson & { video: Video | null })[];
    };
    categories: Category[] | []
};

const AdminCourseEditPage = ({ course, categories }: AdminCourseEditPageProps) => {
    const { authState: { user } } = useContext(AuthContext)!;
    const handler: MutationFunction<CourseUpdateResult, Inputs> = async (data) => {
        const res = await axios.put<CourseUpdateResult>(`/courses/${course.id}`, {
            title: data.title,
            description: data.description,
            thumbnail: data.thumbnailUrl,
            authorId: user?.id
        });

        return res.data;
    };

    const mutation = useMutation({
        mutationFn: handler,
        onSuccess: () => {
            toast.success('Course updated successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Something went wrong');
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async data => {
        mutation.mutate(data);
    };

    const requiredFields = [
        course.title,
        course.description,
        course.thumbnail,
        // course.price,
        course.categoryId,
        course.lessons.some((chapter) => chapter.id),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;
    const isComplete = requiredFields.every(Boolean);
    return (
        <>
            {!course.published && (
                <Banner label="This course is unpublished. It will not be visible to the students." />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        {/* <h1 className="text-2xl font-medium text-white">Course setup</h1> */}
                        <span className="text-sm text-slate-700 text-white">
                            Complete all fields {completionText}
                        </span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        courseId={course.id}
                        isPublished={course.published}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <Heading as='h5' className="text-[#FFF1DC]">Customize your course</Heading>
                        </div>
                        <CourseForm onSubmit={onSubmit}
                            course={course}
                            isLoading={mutation.isPending}
                            categories={categories} />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks} />
                                <Heading as='h5' className="text-[#FFF1DC]">Course chapters</Heading>
                            </div>
                            <ChaptersForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                        {/* {course.lessons.length > 0 ? (
                            <>
                                {course.lessons.map(lesson => (
                                    <Link key={lesson.id} href={`/admin/courses/${course.id}/lessons/${lesson.id}`}
                                        className='flex gap-4 border border-gray-200 rounded-lg mb-6 cursor-pointer'>
                                        {lesson.video?.thumbnail && (
                                            <div className="relative w-[200px] h-[150px] overflow-hidden rounded">
                                                <img
                                                    src={`${lesson.video.thumbnail}?width=640`}
                                                    alt={`Video thumbnail preview for ${lesson.name}`}
                                                    className="w-[200px] h-[200px] object-cover rounded"
                                                />
                                            </div>

                                        )}

                                        <div className='py-2'>
                                            <Heading as='h5'>{lesson.name}</Heading>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <div>
                                <h2 className="text-white">None yet.</h2>
                            </div>
                        )} */}

                        {/* <Link href={`/admin/courses/${course.id}/lessons/new`}>
                            <Button className='mt-4 inline-block rounded bg-[#FFB347] px-4 py-2 text-white hover:bg-[#F5A028] cursor-pointer'>Add a lesson</Button>
                        </Link> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminCourseEditPage;