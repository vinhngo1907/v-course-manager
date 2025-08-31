// /Components/Settings/SettingsTabs.tsx
import React, { useState } from "react";
import ProfileTab from "./ProfileTab";
import PasswordTab from "./PasswordTab";
import PrivacyTab from "./PrivacyTab";

const tabs = ["Profile", "Password", "Privacy"];

const SettingsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "Password":
        return <PasswordTab />;
      case "Privacy":
        return <PrivacyTab />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 text-[#FFF1DC]">
      <div className="flex border-b border-gray-600 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-4 pb-2 ${
              activeTab === tab
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "text-gray-400 hover:text-yellow-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default SettingsTabs;