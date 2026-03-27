"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export const useHeaderActions = () => {
  const { logoutUser } = useContext(AuthContext)!;
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/"); // redirect sau logout (optional)
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleSwitchRole = () => {
    console.log("switch role");
  };

  const handleLanguage = () => {
    console.log("change language");
  };

  return {
    handleLogout,
    handleProfile,
    handleSwitchRole,
    handleLanguage,
  };
};