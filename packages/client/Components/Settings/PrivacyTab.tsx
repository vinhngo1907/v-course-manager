// /Components/Settings/PrivacyTab.tsx
import React, { useState } from "react";
import Toggle from "./Toggle";
import { FaInfoCircle } from "react-icons/fa";
import useGoLive from "@/hooks/useGoLive";

const PrivacyTab: React.FC = () => {
    const [canView, setCanView] = useState(true);
    const [allowComments, setAllowComments] = useState(true);
    const [allowDownload, setAllowDownload] = useState(false);
    const [emailNotif, setEmailNotif] = useState(true);
    const [themeDark, setThemeDark] = useState(false);
    const [goLiveEnabled, setGoLiveEnabled] = useState(false);
    const [language, setLanguage] = useState("en");
    const { handleGoLive } = useGoLive();

    return (
        <div>
            <h3 className="text-xl font-semibold mb-6">🔒 Privacy & More Settings</h3>

            {/* === PRIVACY === */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium">
                        Who can view my videos
                        <FaInfoCircle title="Control who can see your uploaded videos" className="inline text-gray-400 ml-2" />
                    </label>
                    <Toggle enabled={canView} setEnabled={setCanView} />
                </div>
                <p className="text-sm text-gray-400 ml-1">Allow everyone or only followers to watch your videos.</p>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium">
                        Allow comments
                        <FaInfoCircle title="Allow viewers to comment on your videos" className="inline text-gray-400 ml-2" />
                    </label>
                    <Toggle enabled={allowComments} setEnabled={setAllowComments} />
                </div>
                <p className="text-sm text-gray-400 ml-1">Enable or disable comments for your videos.</p>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium">
                        Allow downloads
                        <FaInfoCircle title="Allow viewers to download your videos" className="inline text-gray-400 ml-2" />
                    </label>
                    <Toggle enabled={allowDownload} setEnabled={setAllowDownload} />
                </div>
                <p className="text-sm text-gray-400 ml-1">Toggle to allow or prevent downloads of your videos.</p>
            </div>

            {/* === EMAIL NOTIFICATIONS === */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium">
                        Email Notifications
                        <FaInfoCircle title="Get notified about comments, new followers etc." className="inline text-gray-400 ml-2" />
                    </label>
                    <Toggle enabled={emailNotif} setEnabled={setEmailNotif} />
                </div>
                <p className="text-sm text-gray-400 ml-1">Enable to receive email updates.</p>
            </div>

            {/* === THEME === */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium">
                        Dark Theme
                        <FaInfoCircle title="Switch between dark and light theme" className="inline text-gray-400 ml-2" />
                    </label>
                    <Toggle enabled={themeDark} setEnabled={setThemeDark} />
                </div>
                <p className="text-sm text-gray-400 ml-1">Choose your preferred theme.</p>
            </div>

            {/* === LANGUAGE === */}
            <div className="mb-6">
                <label className="text-lg font-medium block mb-2">
                    Language
                    <FaInfoCircle title="Select your language" className="inline text-gray-400 ml-2" />
                </label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                >
                    <option value="en">English</option>
                    <option value="vi">Vietnamese</option>
                    <option value="jp">Japanese</option>
                </select>
                <p className="text-sm text-gray-400 ml-1 mt-1">Your app language preference.</p>
            </div>

            {/* === GO LIVE === */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <label className="text-lg font-medium">
                        Enable Go Live
                        <FaInfoCircle title="Allow your account to broadcast live streams" className="inline text-gray-400 ml-2" />
                    </label>
                    <Toggle
                        enabled={goLiveEnabled}
                        setEnabled={(value) => {
                            setGoLiveEnabled(value);
                            if(value) handleGoLive();
                        }} />
                </div>
                <p className="text-sm text-gray-400 ml-1">Toggle to enable your account for live streaming.</p>
            </div>
        </div>
    );
};

export default PrivacyTab;
