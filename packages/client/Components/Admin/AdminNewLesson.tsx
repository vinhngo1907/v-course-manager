import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Heading from "../Course/Heading";
import TextInput from "../Course/CourseForm/TextInput";
import TextAreaInput from "../Course/CourseForm/TextAreaInput";
import Field from "../Course/CourseForm/Field";
import { FileUploader } from "../FileUploader";

import { VIDEO_TYPE, VIDEO_THUMBNAIL_TYPE } from "@/constants/file";
import { axios } from "@/utils/axios";

type Inputs = {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    courseId: string;
    duration: number;
};

const AdminNewLesson: NextPage = () => {
    const router = useRouter();
    const courseId = router.query.courseId as string;

    const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
    const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState("");
    const [duration, setDuration] = useState(0);

    const methods = useForm<Inputs>();
    const { setValue } = methods;

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: Inputs) => {
            const res = await axios.post("/video", data);
            return res.data;
        },
        onSuccess: (data) => {
            // router.push(`/admin/courses/${courseId}/lessons/${data.id}`); 
            const { lessonId } = data;
            if (lessonId) {
                router.push(`/admin/courses/${courseId}/lessons/${data.lessonId}`);
            } else {
                router.push(`/admin/courses/${courseId}`);
            }
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutate({
            ...data,
            videoUrl: uploadedVideoUrl,
            thumbnailUrl: uploadedThumbnailUrl,
            courseId,
            duration,
        });
    };

    const handleVideoUpload = (url: string) => {
        setUploadedVideoUrl(url);
        setValue("videoUrl", url);

        const video = document.createElement("video");
        video.src = url;
        video.addEventListener("loadedmetadata", () => {
            setDuration(video.duration);
            setValue("duration", video.duration);
        });
    };

    const handleThumbnailUpload = (url: string) => {
        setUploadedThumbnailUrl(url);
        setValue("thumbnailUrl", url);
    };

    const isReady =
        !!uploadedVideoUrl && !!uploadedThumbnailUrl && duration > 0 && !isPending;

    return (
        <>
            <Heading>New Lesson</Heading>
            <FormProvider {...methods}>
                <form
                    className="flex flex-col max-w-xl"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <TextInput label="Title" name="title" options={{ required: true }} />
                    <TextAreaInput
                        label="Description"
                        name="description"
                        options={{ required: true }}
                    />

                    <Field>
                        <FileUploader
                            initUrl={uploadedVideoUrl}
                            setUrl={handleVideoUpload}
                            title="Upload Video"
                            name="lesson-video"
                            type={VIDEO_TYPE}
                        />
                    </Field>

                    <Field>
                        <FileUploader
                            initUrl={uploadedThumbnailUrl}
                            setUrl={handleThumbnailUpload}
                            title="Upload Video Thumbnail"
                            name="lesson-thumbnail"
                            type={VIDEO_THUMBNAIL_TYPE}
                        />
                    </Field>

                    <input
                        type="submit"
                        className="bg-blue-500 text-white p-4 disabled:bg-slate-50 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed w-fit"
                        value="Create Lesson"
                        disabled={!isReady}
                    />
                </form>
            </FormProvider>
        </>
    );
};

export default AdminNewLesson;
