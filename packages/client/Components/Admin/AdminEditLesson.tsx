import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import LessonForm, { Inputs } from "../Lesson";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "@/utils/axios";
// import { useRouter } from "next/navigation";
import { Lesson, Video as Chapter, MuxData } from "@/types";
// import { AuthContext } from "@/context/AuthContext";
// import VideoViewer from "../Video/VideoViewer";
import { Banner } from "../Banner";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Video } from "lucide-react";
import ChapterActions from "@/pages/admin/courses/[courseId]/lessons/_components/chapter-actions";
import { IconBadge } from "../Icon";
import { ChapterVideoForm } from "@/pages/admin/courses/[courseId]/lessons/_components/chapter-video-form";
import Heading from "../Course/Heading";
// import Heading from "../Course/Heading";

interface AdminLessonEditPageProps {
	courseId: string | string[] | undefined;
	lesson: (Lesson & { videos: Chapter[] | [] })
}
const AdminLessonEditPage = ({ courseId, lesson }: AdminLessonEditPageProps) => {
	const lessonId = lesson.id;
	if (!courseId || !lessonId) return;
	// const [chapter, setChapter] = useState<Chapter & { muxData: MuxData | null } | null>(null);

	// const [videos, setVideos] = useState<{ videoUrl: string; thumbnail: string }[]>(
	// 	lesson.videos?.map((v) => ({
	// 		videoUrl: v.videoUrl || "",
	// 		thumbnail: v.thumbnail || ""
	// 	}))
	// )

	const [videos, setVideos] = useState<{ videoUrl: string; thumbnail: string }[]>(
		lesson.videos?.length
			? lesson.videos.map((v) => ({
				videoUrl: v.videoUrl || "",
				thumbnail: v.thumbnail || "",
			}))
			: [{ videoUrl: "", thumbnail: "" }] // ✅ fallback
	);

	const updateLesson = (data: Inputs) => {
		return axios.put(`/lessons/${lessonId}`, data);
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

	// const name = methods.watch("name");
	// const description = methods.watch("description");
	const firstVideo = videos?.[0];

	// const requiredFields = [
	// 	name,
	// 	description,
	// 	firstVideo?.videoUrl,
	// ];

	const requiredFields = [
		lesson.name,
		lesson.description,
		firstVideo?.videoUrl,
	];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;
	const completionText = `(${completedFields}/${totalFields})`;

	/*
		The isComplete will be set to true if every requiredFields have truthy value
	  */
	const isComplete = requiredFields.every(Boolean);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		// const firstVideo = videos[0] || {};
		const firstVideo = videos?.[0]
		const payload = {
			name: data.name,
			description: data.description,
			videoUrl: firstVideo?.videoUrl || "",
			thumbnailUrl: firstVideo?.thumbnail || "",
			courseId: courseId as string,
			lessonId: lessonId as string,
		};

		// console.log("PAYLOAD:", payload);
		updateMutation.mutate(payload);
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
					<Link
						href={`/admin/courses/${courseId}`}
						className="mt-4 flex items-center text-sm text-[#F5A028] hover:text-[#FFB347] transition mb-4"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to course setup
					</Link>
					<div className="flex items-center justify-between w-full">
						<div className="flex flex-col gap-y-2">
							<span className="text-white text-sm text-slate-700">
								Complete all fields {completionText}
							</span>
						</div>
						<ChapterActions
							// disabled={!isComplete}
							disabled={!isComplete && !lesson.published}
							courseId={courseId}
							lessonId={lessonId}
							published={lesson.published}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
						<div className="space-y-4">
							<div className="bg-white rounded-2xl shadow-sm border border-dark/10 p-6 space-y-4">
								<div className="flex items-center gap-x-2">
									<IconBadge icon={LayoutDashboard} />
									<Heading as="h5" className="font-semibold">Customize your chapter</Heading>
								</div>
								<LessonForm
									courseId={courseId as string}
									lesson={lesson}
									onSubmit={onSubmit}
									isLoading={updateMutation.isPending}
								/>
							</div>
						</div>
						<div className="bg-white rounded-2xl shadow-sm p-6">
							<div className="flex items-center gap-x-2 mb-4">
								<IconBadge icon={Video} />
								<Heading as="h5" className="font-semibold">Add a video</Heading>
							</div>
							{videos.length > 0 ?
								videos.map((video, index) => (
									<ChapterVideoForm
										key={index}
										initialData={{
											videoUrl: video.videoUrl,
											thumbnail: video.thumbnail,
											muxData: null, // or keep existing if you have it
										}}
										lessonId={lessonId}
										courseId={courseId}
										onChange={(data) => {
											setVideos((prev) => {
												const newArr = [...prev];
												newArr[index] = data;
												return newArr
											})
										}}
									/>
								)) : (
									<ChapterVideoForm
										initialData={null}
										lessonId={lessonId}
										courseId={courseId}
										onChange={(data) => setVideos([data])}
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
				</div>
			</div>
		</>
	)
}

export default AdminLessonEditPage