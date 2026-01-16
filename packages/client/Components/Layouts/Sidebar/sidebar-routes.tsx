"use client";
// sidebar/sidebar-routes.tsx
import * as icons from '@/constants/icons'
import { useState } from "react";
// import sidebars from "./sidebars";
import SidebarItem from "./sidebar-items";

export interface SidebarItem {
	icon: string,
	label: string,
	path: string,
	isAdmin?: boolean
}

const sidebars: SidebarItem[] = [
	{
		icon: icons.HOME,
		label: 'Home',
		path: "/"
	},
	{
		icon: icons.MESSAGE,
		label: 'Message',
		path: "/message"
	},
	{
		icon: icons.CONTENT,
		label: 'Courses',
		path: "/courses"
	},
	{ icon: icons.ADMIN, label: 'Admin', path: '/admin', isAdmin: true },
	{ icon: icons.SETTING, label: 'Settings', path: '/settings' },
	// { icon: icons.UPLOAD, label: 'Create Course', path: '/admin/courses', isAdmin: true },
	// {
	// 	icon: icons.UPLOAD,
	// 	label: 'Live Streaming',
	// 	path: "liveStreaming"
	// }
]

// export default sidebars;

export default function SidebarRoutes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      {sidebars.map((sidebar, index) => (
        <SidebarItem
          key={index}
          icon={sidebar.icon}
          label={sidebar.label}
          path={sidebar.path}
          active={index === currentIndex}
          onClick={() => setCurrentIndex(index)}
        />
      ))}
    </>
  );
}
