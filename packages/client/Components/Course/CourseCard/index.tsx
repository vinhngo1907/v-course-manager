import Link from 'next/link'
import Image from 'next/image'
import Heading from "../Heading";
import { Course, Lesson, Video } from '@/types';

type Props = {
    isAdmin: boolean;
    course: Course & {
        lessons: (Lesson & {
            video: Video | null;
        })[];
    }
}

const CourseCard = ({ course, isAdmin }: Props) => {
    const href = isAdmin ? `/admin/courses/${course.id}` : `/courses/${course.id}`
    return (
        <>
            <Link href={href} className='w-full border rounded-lg transition shadow-sm hover:shadow-md cursor-pointer'>
                {course.lessons[0]?.video?.publicPlaybackId && (
                    <Image
                        className="w-full"
                        src={`https://image.mux.com/${course.lessons[0]?.video?.publicPlaybackId}/thumbnail.jpg?width=640`}
                        alt={`Video thumbnail preview for ${course.lessons[0]?.video?.publicPlaybackId}`}
                        width={320}
                        height={240}
                    />
                )}

                <div className="p-8">
                    {!course.published && (<span className="bg-slate-200 text-slate-700 rounded-full text-xs py-1 px-3 mb-2 inline-block">Draft</span>)}

                    <Heading as="h3">
                        {course.title}
                    </Heading>
                    <p className="text-slate-700">
                        {course.description}
                    </p>
                </div>
            </Link>
        </>
    );
};

export default CourseCard;