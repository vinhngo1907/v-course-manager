import * as icons from '@/constants/icons'

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

export default sidebars;