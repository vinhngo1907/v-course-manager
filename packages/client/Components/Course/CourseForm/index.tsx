import { Course } from "@/types";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import Checkbox from "./Checkbox";
import SubmitInput from "./SubmitInput";
import { FileUploader } from "@/Components/FileUploader";
import { useState } from "react";
import { COURSE_THUMBNAIL_TYPE } from "@/constants/file";
import Field from "./Field";

export type Inputs = {
    title: string;
    description: string;
    thumbnailUrl?: string;
};

type Props = {
    course?: Course;
    onSubmit: SubmitHandler<Inputs>;
    isLoading: boolean;
};

const CourseForm = ({ course, onSubmit, isLoading }: Props) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(course?.thumbnail || "");

    const methods = useForm<Inputs>({
        defaultValues: {
            title: course?.title || "",
            description: course?.description || "",
        },
    });

    const handleSubmit: SubmitHandler<Inputs> = (data) => {
        const finalPayload: Inputs = {
            title: data.title || course?.title || "",
            description: data.description || course?.description || "",
            thumbnailUrl: thumbnailUrl || course?.thumbnail || "",
        };

        onSubmit(finalPayload);
    };

    return (
        <FormProvider {...methods}>
            <form
                className="flex flex-col max-w-lg"
                onSubmit={methods.handleSubmit(handleSubmit)}
            >
                <TextInput
                    label="Title"
                    name="title"
                    options={{ required: true }}
                />
                <TextAreaInput
                    label="Description"
                    name="description"
                    options={{ required: true }}
                />
                <Checkbox label="Publish" name="published" />

                <Field>
                    <FileUploader
                        initUrl={thumbnailUrl}
                        type={COURSE_THUMBNAIL_TYPE}
                        setUrl={setThumbnailUrl}
                        title="Upload thumbnail"
                        name="create-course-thumb"
                    />
                </Field>

                <SubmitInput
                    value={`${course ? "Update" : "Create"} course`}
                    isLoading={isLoading}
                />
            </form>
        </FormProvider>
    );
};

export default CourseForm;
