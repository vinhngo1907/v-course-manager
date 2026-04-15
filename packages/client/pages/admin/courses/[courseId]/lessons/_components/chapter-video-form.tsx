"use client";

import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
import { VIDEO_THUMBNAIL_TYPE, VIDEO_TYPE } from "@/constants/file";
import { Video as Chapter, MuxData } from "@/types";
// import toast from "react-hot-toast";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video as Video } from "lucide-react";
import { FileUploader } from "@/Components/FileUploader";
import Button from "@/Components/Layouts/Button";
import EditableField from "@/Components/Lesson/EditableField";
import { FileUpload } from "@/Components/FileUpload";

interface ChapterVideoFormProps {
	// initialData: Chapter & { muxData?: MuxData | null } | null;
	initialData: { videoUrl: string, thumbnail: string } & { muxData?: MuxData | null } | null,
	courseId: string | string[] | null;
	lessonId: string | string[] | null;
	onChange?: (data: {
		videoUrl: string;
		thumbnail: string
	}) => void
}

export const ChapterVideoForm = ({
	initialData,
	courseId,
	lessonId, onChange
}: ChapterVideoFormProps) => {
	// Start editing if there's no video yet
	const [isEditing, setIsEditing] = useState(!initialData?.videoUrl);
	const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail || "");
	const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");

	const toggleEdit = () => setIsEditing((current) => !current);

	// const router = useRouter();

	// sync initialData updates (when passed from parent)
	useEffect(() => {
		setThumbnailUrl(initialData?.thumbnail || "");
		setVideoUrl(initialData?.videoUrl || "");
		setIsEditing(!initialData?.videoUrl);
	}, [initialData]);

	useEffect(() => {
		if (!videoUrl && !thumbnailUrl) return;
		const payload = {
			videoUrl,
			thumbnail: thumbnailUrl,
		};

		onChange?.(payload);
	}, [videoUrl, thumbnailUrl]);

	return (
		<div className="mt-6 rounded-md p-4">
			<div className="font-medium flex items-center justify-between text-dark">
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
					{
					!videoUrl ? (
						<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
							<Video className="h-10 w-10 text-slate-500" />
						</div>
					) : (
						<div className="relative aspect-video mt-2">
							<MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
							{/* {initialData?.muxData?.playbackId ? (
								<MuxPlayer playbackId={initialData.muxData.playbackId} />
							) : (
								<div className="flex items-center justify-center h-full bg-slate-200 rounded-md">
									Processing video...
								</div>
							)} */}
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
							) :
								(
									<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
										<Video className="h-10 w-10 text-slate-40" />
									</div>
								)
						}
					>
						<FileUploader
							initUrl={thumbnailUrl}
							type={VIDEO_THUMBNAIL_TYPE}
							setUrl={setThumbnailUrl}
							title="Upload thumbnail"
							name={`chapter-video-thumb-${lessonId}`}
						/>
						{/* <FileUpload
							endpoint="serverImage"
							onChange={(url) => setThumbnailUrl(url)}
						/> */}
					</EditableField>

					<EditableField
						title="Video file"
						view={
							videoUrl ? (
								// <p className="text-sm text-dark">Video uploaded</p>
								<video className="h-full w-full mt-4" controls>
									<source src={videoUrl} type="video/mp4" />
								</video>
							) : (
								<p className="text-sm text-dark/50">No video uploaded</p>
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
					<div className="text-xs text-dark/60">
						Upload this chapter&apos;s video and thumbnail
					</div>
				</div>
			)}
		</div>
	);
};