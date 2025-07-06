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
    const href = isAdmin ? `/admin/courses/${course.id}` : `/courses/${course.id}`;

    const videoThumbnail = course.lessons?.[0]?.video?.thumbnail;
    const fallbackThumbnail = course.thumbnail;

    const thumbnailUrl = videoThumbnail ?? fallbackThumbnail ?? '/default-thumbnail.jpg';

    return (
        <Link
            href={href}
            className="w-full border rounded-lg transition shadow-sm hover:shadow-md cursor-pointer"
        >
            <img
                className="w-full h-auto"
                src={thumbnailUrl}
                alt={`Course thumbnail for ${course.title}`}
            />

            <div className="p-8">
                {!course.published && (
                    <span className="bg-slate-200 text-slate-700 rounded-full text-xs py-1 px-3 mb-2 inline-block">
                        Draft
                    </span>
                )}

                <Heading as="h3">{course.title}</Heading>
                <p className="text-[#fff1dc]">{course.description}</p>
            </div>
        </Link>
    );
};

export default CourseCard;