"use client";

import { useState, useEffect } from "react";

// import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { COURSE_THUMBNAIL_TYPE, VIDEO_TYPE } from "@/constants/file";
import { Video as Chapter, MuxData } from "@/types";
import toast from "react-hot-toast";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video as Video } from "lucide-react";
import { FileUploader } from "@/Components/FileUploader";
import Button from "@/Components/Layouts/Button";
import EditableField from "@/Components/Lesson/EditableField";

interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null } | null;
    courseId: string | string[] | null;
    lessonId: string | string[] | null;
}

export const ChapterVideoForm = ({
    initialData,
    courseId,
    lessonId,
}: ChapterVideoFormProps) => {
    // Start editing if there's no video yet
    const [isEditing, setIsEditing] = useState(!initialData?.videoUrl);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail || "");
    const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    // sync initialData updates (when passed from parent)
    useEffect(() => {
        setThumbnailUrl(initialData?.thumbnail || "");
        setVideoUrl(initialData?.videoUrl || "");
        setIsEditing(!initialData?.videoUrl);
    }, [initialData]);

    const handleSave = async () => {
        try {
            // TODO: replace with your real API endpoints
            const payload = { thumbnail: thumbnailUrl, videoUrl };
            if (initialData) {
                await axios.patch(`/api/courses/${courseId}/chapters/${lessonId}`, payload);
                toast.success("Video updated");
            } else {
                await axios.post(`/api/courses/${courseId}/chapters/${lessonId}/videos`, payload);
                toast.success("Video added");
            }
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4 text-white">
            <div className="font-medium flex items-center justify-between">
                Chapter video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>Cancel</>}
                    {!isEditing && !videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a video
                        </>
                    )}
                    {!isEditing && videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit video
                        </>
                    )}
                </Button>
            </div>

            {/* preview / player */}
            {!isEditing && (
                <>
                    {!videoUrl ? (
                        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                            <Video className="h-10 w-10 text-slate-500" />
                        </div>
                    ) : (
                        <div className="relative aspect-video mt-2">
                            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
                        </div>
                    )}
                    {videoUrl && (
                        <div className="text-xs text-muted-foreground mt-2">
                            Videos can take a few minutes to process. Refresh the page if the
                            video does not appear.
                        </div>
                    )}
                </>
            )}

            {/* edit / upload UI */}
            {isEditing && (
                <div>
                    <EditableField
                        title="Video thumbnail"
                        view={
                            thumbnailUrl ? (
                                <div className="relative aspect-video">
                                    <img
                                        src={thumbnailUrl}
                                        alt="Thumbnail"
                                        className="object-cover rounded-md w-full h-full"
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                                    <Video className="h-10 w-10 text-slate-500" />
                                </div>
                            )
                        }
                    >
                        <FileUploader
                            initUrl={thumbnailUrl}
                            type={COURSE_THUMBNAIL_TYPE}
                            setUrl={setThumbnailUrl}
                            title="Upload thumbnail"
                            name={`chapter-video-thumb-${lessonId}`}
                        />
                    </EditableField>

                    <EditableField
                        title="Video file"
                        view={
                            videoUrl ? (
                                <p className="text-sm">Video uploaded</p>
                            ) : (
                                <p className="text-sm text-muted-foreground">No video uploaded</p>
                            )
                        }
                    >
                        <FileUploader
                            initUrl={videoUrl}
                            type={VIDEO_TYPE}
                            setUrl={setVideoUrl}
                            title="Upload video"
                            name={`chapter-video-file-${lessonId}`}
                        />
                    </EditableField>

                    <Button onClick={handleSave} className="mt-4">
                        {initialData ? "Update" : "Add"} Video
                    </Button>
                    <div className="text-xs text-muted-foreground mt-4">
                        Upload this chapter&apos;s video and thumbnail
                    </div>
                </div>
            )}
        </div>
    );
};