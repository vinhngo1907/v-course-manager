// /Components/Settings/ProfileTab.tsx
import React from "react";

const ProfileTab: React.FC = () => {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">👤 Profile Info</h3>
            <p className="text-gray-400 mb-4">
                This is where you'd edit your profile details (name, bio, etc).
            </p>
            {/* Form fields mockup */}
            <input
                className="block w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 text-white"
                placeholder="Name"
            />
            <input
                className="block w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 text-white"
                placeholder="Bio"
            />
            <button className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400">
                Save Profile
            </button>
        </div>
    );
};

export default ProfileTab;