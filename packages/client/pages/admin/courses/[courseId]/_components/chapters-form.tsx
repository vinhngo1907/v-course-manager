"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, PlusCircle } from "lucide-react";

import { ChaptersList } from "./chapters-list";

import TextInput from "@/Components/Course/CourseForm/TextInput";
import Button from "@/Components/Layouts/Button";
import { axios } from "@/utils/axios";
import { Course, Lesson } from "@/types";

interface ChaptersFormProps {
  initialData: Course & { lessons: Lesson[] };
  courseId: string;
}

type Inputs = {
  title: string;
};

export const ChaptersForm = ({
  initialData,
  courseId,
}: ChaptersFormProps) => {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((prev) => !prev);

  const methods = useForm<Inputs>({
    defaultValues: {
      title: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: Inputs) => {
    try {
      // console.log({courseId, data})
      await axios.post(`/courses/${courseId}/chapters`, {
        name: data.title
      });

      toast.success("Chapter created");

      reset();
      toggleCreating();

      router.refresh();
    } catch (err: any) {
      console.log("[ERROR_REORDER]", err.response)
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (
    updateData: { id: string; position: number }[]
  ) => {
    try {
      setIsUpdating(true);

      await axios.put(`/lessons/${courseId}/chapters/reorder`, {
        list: updateData,
      });

      toast.success("Chapters reordered");

      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = async (id: string) => {
    router.push(`/admin/courses/${courseId}/lessons/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">

      {isUpdating && (
        <div className="absolute inset-0 bg-slate-500/20 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      )}

      <div className="font-medium flex items-center justify-between">
        Course chapters

        <Button onClick={toggleCreating} variant="outline">
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <TextInput
              name="title"
              label=""
            //   placeholder="e.g. Introduction"
              options={{ required: true }}
            />

            <Button type="submit">
              Create
            </Button>
          </form>
        </FormProvider>
      )}

      {!isCreating && (
        <div className="text-sm mt-2">
          {!initialData.lessons?.length && (
            <p className="text-slate-500 italic">
              No chapters
            </p>
          )}

          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.lessons || []}
          />
        </div>
      )}

      {!isCreating && (
        <p className="text-xs text-slate-500 mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}

    </div>
  );
};