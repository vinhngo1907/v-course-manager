import { Course, Category } from "@/types";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
// import Checkbox from "./Checkbox";
import SubmitInput from "./SubmitInput";
import { FileUploader } from "@/Components/FileUploader";
import { useState } from "react";
import { COURSE_THUMBNAIL_TYPE } from "@/constants/file";
import EditableField from "./EditableField";
// import { Combobox } from "@/Components/Globals/Ui/Combobox";
// import { CategoryForm } from "@/pages/admin/courses/[courseId]/_components/category-form";
import SelectInput from "./SelectInput";

export type Inputs = {
  title: string;
  description: string;
  published?: boolean;
  thumbnailUrl?: string;
  categoryId: string;
};

type Props = {
  course?: Course;
  onSubmit: SubmitHandler<Inputs>;
  isLoading: boolean;
  categories: Category[] | []
};

const CourseForm = ({ course, onSubmit, isLoading, categories }: Props) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(course?.thumbnail || "");

  const methods = useForm<Inputs>({
    defaultValues: {
      title: course?.title || "",
      description: course?.description || "",
      published: course?.published || false,
      categoryId: course?.categoryId || ""
    },
  });

  const handleSubmit: SubmitHandler<Inputs> = (data) => {
    const finalPayload: Inputs = {
      title: data.title || course?.title || "",
      description: data.description || course?.description || "",
      published: data.published,
      thumbnailUrl: thumbnailUrl || course?.thumbnail || "",
      categoryId: data.categoryId ?? course?.categoryId ?? ""
    };

    onSubmit(finalPayload);
  };

  // if (!course) return null;

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const categoryId = methods.watch("categoryId");
  const selectedCategory = categoryOptions.find(
    (option) => option.value === categoryId
  );

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

        {/* <CategoryForm courseId={course?.id} initialData={course}
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        /> */}
        <EditableField
          title="Category"
          view={
            <p>
              {selectedCategory?.label || "No category"}
            </p>
          }
        >
          <SelectInput
            name="categoryId"
            // label="Select options"
            options={categoryOptions}
            registerOptions={{ required: true }}
          />
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
      {/* <CategoryForm courseId={course?.id} initialData={course}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      /> */}
    </FormProvider >
  );
};

export default CourseForm;