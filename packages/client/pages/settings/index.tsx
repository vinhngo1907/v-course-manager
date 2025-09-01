// /pages/settings/index.tsx
import React, { useContext, useEffect } from "react";
import Layout from "@/Components/Layouts";
import SettingsTabs from "@/Components/Settings/SettingsTabs";
import { AuthContext } from "@/context/AuthContext";

const SettingsPage: React.FC = () => {
    const { authState: { isAuthenticated, user, authLoading } } = useContext(AuthContext)!;

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            // Redirect to login or show a message
            window.location.href = '/'; // Redirect to home or login page
        }
    }, [isAuthenticated, authLoading]);
    return (
        <Layout title="Settings" isWide>
            <SettingsTabs />
        </Layout>
    );
};

export default SettingsPage;