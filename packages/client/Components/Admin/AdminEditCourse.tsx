import CourseForm, { Inputs } from "@/Components/Course/CourseForm";
import Heading from "@/Components/Course/Heading";
import { Course, Lesson, Video } from "@/types";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import Link from 'next/link';
import Image from 'next/image';
import Button from "@/Components/Layouts/Button";

type CourseUpdateResult = {
    id: string; // ID là string nếu Prisma dùng UUID
};

type AdminCourseEditPageProps = {
    course: Course & {
        lessons: (Lesson & { video: Video | null })[];
    };
};

const AdminCourseEditPage = ({ course }: AdminCourseEditPageProps) => {
    const handler: MutationFunction<CourseUpdateResult, Inputs> = async (data) => {
        const res = await axios.put<CourseUpdateResult>(`/courses/${course.id}`, {
            title: data.title,
            description: data.description,
            thumbnail: data.thumbnailUrl,
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

    return (
        <div className="grid md:grid-cols-2">
            <div>
                <Heading as='h2'>{course.title}</Heading>
                <CourseForm onSubmit={onSubmit} course={course} isLoading={mutation.isPending} />
            </div>
            <div>
                <Heading as='h4'>Lessons</Heading>
                {course.lessons.length > 0 ? (
                    <>
                        {course.lessons.map(lesson => (
                            <Link key={lesson.id} href={`/admin/courses/${course.id}/lessons/${lesson.id}`}
                                className='flex gap-4 border border-gray-200 rounded-lg mb-6 cursor-pointer'>
                                {lesson.video?.publicPlaybackId && (
                                    <Image
                                        src={`${course.thumbnail}?width=640`}
                                        alt={`Video thumbnail preview for ${lesson.name}`}
                                        width={180}
                                        height={100}
                                    />
                                )}

                                <div className='py-2'>
                                    <Heading as='h5'>{lesson.name}</Heading>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    <div>
                        <h2>None yet.</h2>
                    </div>
                )}

                <Link href={`/admin/courses/${course.id}/lessons/new`}>
                    <Button intent='secondary'>Add a lesson</Button>
                </Link>
            </div>
        </div>
    );
};

export default AdminCourseEditPage;