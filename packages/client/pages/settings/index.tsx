// /pages/settings/index.tsx
import React, { useContext, useEffect } from "react";
import Layout from "@/Components/Layouts";
import SettingsTabs from "@/Components/Settings/SettingsTabs";
import { AuthContext } from "@/context/AuthContext";
import { ModalContext } from "@/context/ModalContext";

const SettingsPage: React.FC = () => {
    const { authState: { isAuthenticated, authLoading } } = useContext(AuthContext)!;
    const { toggleModal } = useContext(ModalContext)!;
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            toggleModal("login");
        }
    }, [isAuthenticated, authLoading, toggleModal]);

    if (!isAuthenticated) {
        return (
            <Layout title="Settings" isWide>
                <p className="text-center text-gray-600">
                   Please login to access Settings.
                </p>
            </Layout>
        );
    }


    return (
        <Layout title="Settings" isWide>
            <SettingsTabs />
        </Layout>
    );
};

export default SettingsPage;