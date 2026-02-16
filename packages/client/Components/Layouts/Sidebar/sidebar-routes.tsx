"use client";

import * as icons from "@/constants/icons";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-items";

export interface SidebarItem {
  icon: string;
  label: string;
  path: string;
  isAdmin?: boolean;
}

export const sidebars: SidebarItem[] = [
  { icon: icons.HOME, label: "Home", path: "/" },
  { icon: icons.BROWSE, label: "Browse", path: "/search" },
  { icon: icons.ADMIN, label: "Admin", path: "/admin", isAdmin: true },
  { icon: icons.SETTING, label: "Settings", path: "/settings" },
];

export default function SidebarRoutes() {
  const pathname = usePathname();

  return (
    <>
      {sidebars.map((sidebar) => {
        const isActive =
          (pathname === "/" && sidebar.path === "/") ||
          pathname === sidebar.path ||
          pathname.startsWith(`${sidebar.path}/`);

        return (
          <SidebarItem
            key={sidebar.path}
            icon={sidebar.icon}
            label={sidebar.label}
            path={sidebar.path}
            active={isActive}
          />
        );
      })}
    </>
  );
}
