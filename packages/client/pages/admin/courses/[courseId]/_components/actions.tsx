import React, { useState } from "react";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useRouter } from "next/navigation"
import { axios } from "@/utils/axios";
import toast from "react-hot-toast";
import Button from "@/Components/Layouts/Button";
import { Trash } from "lucide-react";
import { ConfirmModal } from "@/Components/Modals/confirm-modal";
import { AuthorizationHeader } from "@/services/request.extras";

interface ActionProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionProps) => {
    const router = useRouter()
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);
    const onClick = async () => {
        try {
            setIsLoading(true);

            const newStatus = !isPublished;

            await axios.patch(`/course/${courseId}/publish`, {
                published: newStatus,
            }, {
                withCredentials: true,
                headers: AuthorizationHeader(),
            });

            if (newStatus) {
                toast.success("Course published");
                confetti.onOpen();
            } else {
                toast.success("Course unpublished");
            }

            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/course/${courseId}`, {
                withCredentials: true,
                headers: AuthorizationHeader(),
            });
            
            toast.success("Course deleted");
            router.refresh();
            router.push(`/admin/courses`);
        } catch (error) {
            toast.error("Something went wrong");
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
                className="text-white"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}