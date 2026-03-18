import { Course } from "@/types";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import Checkbox from "./Checkbox";
import SubmitInput from "./SubmitInput";
import { FileUploader } from "@/Components/FileUploader";
import { useState } from "react";
import { COURSE_THUMBNAIL_TYPE } from "@/constants/file";
import EditableField from "./EditableField";

export type Inputs = {
  title: string;
  description: string;
  published?: boolean;
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
      published: course?.published || false,
    },
  });

  const handleSubmit: SubmitHandler<Inputs> = (data) => {
    const finalPayload: Inputs = {
      title: data.title || course?.title || "",
      description: data.description || course?.description || "",
      published: data.published,
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
        {/* TITLE */}
        <EditableField
          title="Title"
          view={<p>{methods.getValues("title")}</p>}
        >
          <TextInput
            // label="Title"
            name="title"
            options={{ required: true }}
          />
        </EditableField>

        {/* DESCRIPTION */}
        <EditableField
          title="Description"
          view={<p>{methods.getValues("description")}</p>}
        >
          <TextAreaInput
            // label="Description"
            name="description"
            options={{ required: true }}
          />
        </EditableField>

        {/* PUBLISH */}
        <EditableField
          title="Publish"
          view={<p>{methods.getValues("published") ? "Yes" : "No"}</p>}
        >
          <Checkbox label="Publish" name="published" />
        </EditableField>

        {/* IMAGE */}
        <EditableField
          title="Course image"
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
                No thumbnail
              </div>
            )
          }
        >
          <FileUploader
            initUrl=""
            type={COURSE_THUMBNAIL_TYPE}
            setUrl={setThumbnailUrl}
            title="Upload thumbnail"
            name="create-course-thumb"
          />
        </EditableField>

        <SubmitInput
          value={`${course ? "Update" : "Create"} course`}
          isLoading={isLoading}
        />
      </form>
    </FormProvider>
  );
};

export default CourseForm;