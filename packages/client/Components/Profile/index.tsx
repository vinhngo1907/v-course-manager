// components/ProfileDropdown.tsx
import React from "react";
import { FaUser, FaSignOutAlt, FaBroadcastTower } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setIsStreamer } from "@/redux/features/liveVideoStreamingSlice";

const ProfileDropdown = ({ toggleModal }: { toggleModal: () => void }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleGoLive = async () => {
        // Giả sử gọi API tạo room mới:
        const res = await fetch("/api/start-live", { method: "POST" });
        const data = await res.json();

        dispatch(setIsStreamer(true));
        router.push(`/livestream?id=${data.roomId}`);
    };

    return (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md p-2">
            <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                <FaUser className="mr-2" /> Profile
            </Link>

            <button
                onClick={handleGoLive}
                className="flex w-full items-center px-4 py-2 hover:bg-gray-100 text-left"
            >
                <FaBroadcastTower className="mr-2 text-red-600" /> Go Live
            </button>

            <button
                onClick={toggleModal}
                className="flex w-full items-center px-4 py-2 hover:bg-gray-100 text-left"
            >
                <FaSignOutAlt className="mr-2" /> Log Out
            </button>
        </div>
    );
};

export default ProfileDropdown;