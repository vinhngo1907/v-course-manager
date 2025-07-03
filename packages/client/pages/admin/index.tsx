import AdminPage from "@components/Admin/AdminPage"
import Layout from "@components/Layouts"
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
