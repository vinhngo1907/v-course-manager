// /pages/settings/index.tsx
import React from "react";
import Layout from "@/Components/Layouts";
import SettingsTabs from "@/Components/Settings/SettingsTabs";

const SettingsPage: React.FC = () => {
    return (
        <Layout title="Settings" isWide>
            <SettingsTabs />
        </Layout>
    );
};

export default SettingsPage;