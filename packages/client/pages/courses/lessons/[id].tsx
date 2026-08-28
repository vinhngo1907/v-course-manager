import { AuthContext } from "@/context/AuthContext";
import { ModalContext } from "@/context/ModalContext";
import { axios } from "@/utils/axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";

export default async function LessonIdPage({
  params
}: { params: { courseId: string, lessonId: string } }) {
  const router = useRouter();
  const { id } = router.query;
  const { authState } = useContext(AuthContext)!;
  const { isAuthenticated, user } = authState;
  const { toggleModal } = useContext(ModalContext);

  useEffect(() => {
    if (!user?.id) return redirect("/");
  }, [user?.id, id]);

  useEffect(() => {
    if (!id) return;
    
    const getLesson = async () => {
      const res = await axios.get(`/lessons/${id}`);
      const lesson = res.data.lesson
    }

    if (!isAuthenticated) {
      toggleModal('login');
    } else {
      getLesson();
    }

  }, [id])
  return (
    <></>
  )
}