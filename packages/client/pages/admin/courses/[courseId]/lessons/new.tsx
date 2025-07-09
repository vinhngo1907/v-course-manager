import AdminNewLesson from "@/Components/Admin/AdminNewLesson";
import Layout from "@/Components/Layouts";

const AdminNewLessonPage = () => {
    return (
         <Layout title="Edit a course" isWide>
            <AdminNewLesson  />
        </Layout>
    );
}

export default AdminNewLessonPage;