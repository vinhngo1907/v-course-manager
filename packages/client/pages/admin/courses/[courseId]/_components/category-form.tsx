"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

import { Course } from "@/types";
import { axios } from "@/utils/axios";

import { cn } from "@/libs/utils";
import { Combobox } from "@/Components/Globals/Ui/Combobox";
import Button from "@/Components/Layouts/Button";

interface CategoryFormProps {
    initialData: Course;
    courseId: string | null;
    options: {
        label: string;
        value: string;
    }[];
}

export const CategoryForm = ({
    initialData,
    courseId,
    options,
}: CategoryFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    // const [categoryId, setCategoryId] = useState(
    //     initialData?.categoryId || ""
    // );
    const [categoryId, setCategoryId] = useState<string | undefined>(
        initialData?.categoryId || undefined
    );
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const toggleEdit = () => setIsEditing((prev) => !prev);

    const onSubmit = async () => {
        if (!categoryId) {
            toast.error("Category is required");
            return;
        }

        try {
            setIsLoading(true);

            await axios.patch(`/courses/${courseId}`, {
                categoryId,
            });

            toast.success("Course updated");
            setIsEditing(false);

            router.refresh?.();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const selectedOption = options.find(
        (option) => option.value === initialData.categoryId
    );

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course category

                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        "Cancel"
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit category
                        </>
                    )}
                </Button>
            </div>

            {/* VIEW MODE */}
            {!isEditing && (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData.categoryId && "text-slate-500 italic"
                    )}
                >
                    {selectedOption?.label || "No category"}
                </p>
            )}

            {/* EDIT MODE */}
            {isEditing && (
                <div className="space-y-4 mt-4">
                    <Combobox
                        options={options}
                        value={categoryId}
                        onChange={(value) => setCategoryId(value)}
                    />

                    <div className="flex items-center gap-x-2">
                        <Button type="button"
                            disabled={!categoryId || isLoading}
                            onClick={onSubmit}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

// export const CategoryForm = ({
//     initialData,
//     courseId,
//     options,
// }: CategoryFormProps) => {
//     const [categoryId, setCategoryId] = useState(
//         initialData?.categoryId || ""
//     );
//     const [isLoading, setIsLoading] = useState(false);

//     const router = useRouter();

//     const onSubmit = async () => {
//         if (!categoryId) {
//             toast.error("Category is required");
//             return;
//         }

//         if (categoryId === initialData.categoryId) {
//             toast("No changes made");
//             return;
//         }

//         try {
//             setIsLoading(true);

//             await axios.patch(`/courses/${courseId}`, {
//                 categoryId,
//             });

//             toast.success("Course updated");
//             router.refresh?.();
//         } catch (error) {
//             toast.error("Something went wrong");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="space-y-4 mt-4">
//             <Combobox
//                 options={options}
//                 value={categoryId}
//                 onChange={setCategoryId}
//             />

//             <Button
//                 disabled={!categoryId || isLoading}
//                 onClick={onSubmit}
//             >
//                 {isLoading ? "Saving..." : "Save"}
//             </Button>
//         </div>
//     );
// };