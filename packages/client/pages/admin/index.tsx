import AdminPage from "@/Components/Admin/AdminPage"
import Layout from "@/Components/Layouts"
import { NextPage } from "next";

type Session = {
    id: number
    email: string
    username: string
    fullName: string
}

type AdminProps = {
    profile: Session | null
}

const AdminLayout: NextPage<AdminProps> = () => {
    return (
        <Layout title="Admin">
           <AdminPage />
        </Layout>
    )
}

export default AdminLayout
