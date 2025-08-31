// components/MainScreen/DropdownPanel.tsx
"use client";
import React, { useState } from "react";

const DropdownPanel: React.FC = () => {
    const [tab, setTab] = useState<"videos" | "chat">("chat");

    return (
        <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex">
                <button
                    className={`flex-1 px-4 py-2 ${tab === "videos" ? "bg-gray-800 text-white" : "bg-gray-900 text-gray-400"
                        }`}
                    onClick={() => setTab("videos")}
                >
                    Videos
                </button>
                <button
                    className={`flex-1 px-4 py-2 ${tab === "chat" ? "bg-gray-800 text-white" : "bg-gray-900 text-gray-400"
                        }`}
                    onClick={() => setTab("chat")}
                >
                    Chat
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {tab === "videos" ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((v) => (
                            <div key={v} className="bg-gray-700 p-2 rounded">
                                <div className="h-20 bg-gray-500 rounded mb-2"></div>
                                <p className="text-white text-sm">Video {v}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto">
                            {/* Fake messages */}
                            {[1, 2, 3].map((m) => (
                                <div key={m} className="text-white mb-2">
                                    <strong>User{m}:</strong> Hello!
                                </div>
                            ))}
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Write a message..."
                                className="w-full p-2 rounded bg-gray-800 text-white"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropdownPanel;