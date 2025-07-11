import Link from 'next/link'
import Heading from "../Heading";
import { Course, Lesson, Video } from '@/types';
import { useContext } from 'react';
import { ModalContext } from '@/context/ModalContext';

type Props = {
    isAdmin: boolean;
    forcePublic?: boolean;
    course: Course & {
        lessons: (Lesson & {
            video: Video | null;
        })[];
    },
    isAuthenticated: boolean
}

const CourseCard = ({ course, isAdmin, forcePublic, isAuthenticated }: Props) => {
    // const href = isAdmin ? `/admin/courses/${course.id}` : `/courses/${course.id}`;
    const { toggleModal } = useContext(ModalContext)!;
    const href = forcePublic
        ? `/courses/${course.id}`
        : isAdmin
            ? `/admin/courses/${course.id}`
            : `/courses/${course.id}`;


    const fallbackThumbnail = course.lessons?.[0]?.video?.thumbnail;
    const thumbnailUrl = course.thumbnail ?? fallbackThumbnail ?? '/default-thumbnail.jpg';

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isAuthenticated) {
            e.preventDefault();
            toggleModal('login');
        }
    };
    return (
        <Link
            onClick={handleClick}
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