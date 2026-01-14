// /Components/Settings/PasswordTab.tsx
import React from "react";

const PasswordTab: React.FC = () => {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">🔑 Change Password</h3>
            <p className="text-gray-400 mb-4">
                Set a strong password to keep your account secure.
            </p>
            <input
                className="block w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 text-white"
                placeholder="Current Password"
                type="password"
            />
            <input
                className="block w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 text-white"
                placeholder="New Password"
                type="password"
            />
            <input
                className="block w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700 text-white"
                placeholder="Confirm New Password"
                type="password"
            />
            <button className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400">
                Update Password
            </button>
        </div>
    );
};

export default PasswordTab;