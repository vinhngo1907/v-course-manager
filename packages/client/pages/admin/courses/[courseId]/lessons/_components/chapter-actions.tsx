import Button from "@/Components/Layouts/Button";
import { ConfirmModal } from "@/Components/Modals/confirm-modal";
import { AuthorizationHeader } from "@/services/request.extras";
import { axios } from "@/utils/axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string | string[] | null;
    lessonId: string;
    published: boolean;
}
const ChapterActions = ({ disabled, courseId, lessonId, published }: ChapterActionsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const onClick = async () => {
        try {
            setIsLoading(true);
            if (published) {
                await axios.patch(`/courses/${courseId}/lessons/${lessonId}/unpublish`,
                    {
                        withCredentials: true,
                        headers: AuthorizationHeader()
                    });
                toast.success("Chapter unpublished")
            } else {
                await axios.patch(`/courses/${courseId}/lessons/${lessonId}/publish`,
                    {
                        withCredentials: true,
                        headers: AuthorizationHeader()
                    }
                )
                toast.success("Chapter published")
            }
            router.refresh();
        } catch (error) {
            console.error(error);
            toast("Something went wrong!!!")
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/courses/${courseId}/lessons/${lessonId}`,
                {
                    withCredentials: true,
                    headers: AuthorizationHeader()
                }
            )
            toast("Chapter is deleted");
            router.refresh()
            router.push(`/admin/courses/${courseId}`)
        } catch (error) {
            console.error(error);
            toast("Something went wrong!!!")
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {published ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}

export default ChapterActions;