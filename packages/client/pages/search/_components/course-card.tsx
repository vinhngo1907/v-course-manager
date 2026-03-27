import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/Components/Icon";
import { CourseProgress } from "@/Components/Course/CourseProgress";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price?: number;
    progress: number | null;
    category: string;
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    progress,
    category,
}: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group transition overflow-hidden rounded-lg p-3 h-full 
                bg-[#FFF1DC] border border-[#F5A028]/30 hover:shadow-md">

                {/* Image */}
                <div className="relative w-full h-48 rounded-md overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col pt-3">
                    
                    {/* Title */}
                    <div className="text-lg md:text-base font-semibold text-[#2C2C2C] 
                        group-hover:text-[#FFB347] transition line-clamp-2">
                        {title}
                    </div>

                    {/* Category */}
                    <p className="text-xs text-[#6B6B6B] mt-1">
                        {category}
                    </p>

                    {/* Lessons */}
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-[#6B6B6B]">
                            <IconBadge 
                                size="sm" 
                                icon={BookOpen}
                                // className="bg-[#FFB347] text-white"
                            />
                            <span>
                                {chaptersLength}{" "}
                                {chaptersLength === 1 ? "Lesson" : "Lessons"}
                            </span>
                        </div>
                    </div>

                    {/* Progress */}
                    {progress !== null && (
                        <CourseProgress
                            variant={progress === 100 ? "success" : "default"}
                            size="sm"
                            value={progress}
                        />
                    )}
                </div>
            </div>
        </Link>
    );
};