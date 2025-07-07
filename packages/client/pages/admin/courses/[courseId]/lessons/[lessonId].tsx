import { AuthContext } from "@/context/AuthContext";
import { ModalContext } from "@/context/ModalContext";
import { Course, Lesson, Video } from "@/types";
import { axios } from "@/utils/axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function AdminEditLesson() {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)!;
    const { toggleModal } = useContext(ModalContext)!;
    const router = useRouter();
    const { courseId } = router.query;

    const [course, setCourse] = useState<
        (Course & { lessons: (Lesson & { video: Video | null })[] }) | null
    >(null);

    useEffect(() => {
        if (!courseId) return;
        if (authLoading) return;
        if (!isAuthenticated) return;

        const fetchCourse = async () => {
            try {
                // setLoading(true);
                const res = await axios.get(`/courses/lesson/${courseId}`);
                console.log({ res })
                setCourse(res?.data);
            } catch (err) {
                console.error('Failed to fetch course:', err);
            }
        };

        fetchCourse();
    }, [courseId, authLoading, isAuthenticated]);
}