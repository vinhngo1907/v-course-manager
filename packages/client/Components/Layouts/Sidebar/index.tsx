import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import LogoComponent from '@/Components/Globals/Logo';
import sidebars from './sidebars';

type SidebarProps = {
	isWide?: boolean;
};

function Sidebar({ isWide }: SidebarProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<aside className={`${styles.sidebar} ${isWide ? styles.collapsed : ''}`}>
			<div className={styles.wrapperSidebar}>
				<div className={styles.logo}>
					<a className={styles.brand} href="#">
						<LogoComponent></LogoComponent>
						<h3 className={styles.name}>Course Manager</h3>
					</a>
				</div>
				{sidebars.map((sidebar, index) => (
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
								<img src={`${sidebar.icon}`} alt="icon" className="w-6 h-6 text-[#FFB347]"/>
							</div>
							<div className={styles.itemLabel}>{sidebar.label}</div>
						</a>
					</div>
				))}
			</div>
		</aside>
	);
}

Sidebar.propsType = {
	isWide: PropTypes.bool,
};

export default Sidebar;