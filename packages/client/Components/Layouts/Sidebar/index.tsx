import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import LogoComponent from '@/Components/Globals/Logo';
import sidebars from './sidebar-routes';
import { useSidebar } from '@/hooks/use-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import Button from '../Button';
import SidebarRoutes from './sidebar-routes';
import SidebarToggle from './toggle';

function Sidebar() {
	const { collapsed, toggle, onExpand, onCollapse } = useSidebar(state => state);
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
			<div className={styles.wrapperSidebar}>
				<div className={styles.logo}>
					<a className={styles.brand} href="#">
						<LogoComponent />
						<h3 className={styles.name}>Course Manager</h3>
					</a>
				</div>
				{/* <div>
					{collapsed && (
						<div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
							<Button
								onClick={onExpand}
								className="h-auto p-2"
							>
								<ArrowRightFromLine
									className="w-5 h-5 text-[#F5A028] cursor-pointer]"
								/>
							</Button>
						</div>
					)}

					{!collapsed && (
						<div className="p-3 pl-6 mb-2 flex items-center w-full">
							<p className="font-semibold text-[#FFB347]">For you</p>

							<Button
								className="h-9 w-9 p-0 flex items-center justify-center"
								onClick={onCollapse}
							>
								<ArrowLeftFromLine
									className="w-5 h-5 text-[#F5A028] cursor-pointer"
								/>
							</Button>
						</div>
					)}
				</div> */}
				<SidebarToggle />
				<SidebarRoutes />
				{/* {sidebars.map((sidebar, index) => (
					<div
						onClick={() => setCurrentIndex(index)}
						className={
							`${styles.sidebarItem} 
							${index === currentIndex ? styles.itemActive : ''}`
						}
						key={'sidebarItem' + index}
					>
						<a href={`${sidebar.path || '#'}`}>
							<div className={styles.itemIcon}>
								<img src={`${sidebar.icon}`} alt="icon" className="w-6 h-6 text-[#FFB347]" />
							</div>
							<div className={styles.itemLabel}>{sidebar.label}</div>
						</a>
					</div>
				))} */}
			</div>
		</aside>
	);
}

Sidebar.propsType = {
	isWide: PropTypes.bool,
};

export default Sidebar;