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

const Admin: NextPage<AdminProps> = () => {
    return (
        <Layout isWide title="Admin">
           <AdminPage />
        </Layout>
    )
}

export default Admin
