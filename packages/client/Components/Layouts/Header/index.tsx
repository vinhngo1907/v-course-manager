import React from 'react';
import { PROFILE as ProfileIcon, SEARCH as SearchIcon } from '@/constants/icons';
import styles from './index.module.css';
import { ModalTypeEnum } from '..';
import { IUser } from '@/interfaces';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/Globals/Ui/DropdownMenu';
import { cn } from '@/libs/utils';
import { getProfileMenuItems } from './header-items';
import { useHeaderActions } from './header-actions';

type Props = {
    user: null | IUser;
    toggleModal: Function;
};

export default function Header({ user, toggleModal }: Props) {
    const actions = useHeaderActions();
    const profileMenuItems = getProfileMenuItems(actions);
    
    return (
        <header className={styles.header}>
            <div className={styles.wrapperHeader}>
                {/* LEFT */}
                <div className={styles.headerLeft}>
                    <div className={styles.search}>
                        <div className={styles.searchIcon}>
                            <img src={SearchIcon} alt="search-icon" />
                        </div>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className={styles.headerRight}>
                    <ul className={`${styles.icons} flex items-center justify-center`}>
                        <li className="flex items-center">
                            {user ? (
                                // Dropdown when logged in
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center text-[#FFB347] hover:opacity-80 transition">
                                            <img src={ProfileIcon} alt="icon" />
                                            <p className="pl-2">{user.fullName}</p>
                                        </button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end" className="w-48">
                                        {profileMenuItems.map((item, index) => {
                                            if (item.type === "separator") {
                                                return <DropdownMenuSeparator key={index} />;
                                            }

                                            return (
                                                <DropdownMenuItem
                                                    key={index}
                                                    onClick={item.onClick}
                                                    className={cn(
                                                        item.danger &&
                                                        "text-red-500 hover:bg-red-100 hover:text-red-600"
                                                    )}
                                                >
                                                    {item.icon && (
                                                        <img
                                                            src={item.icon}
                                                            alt="icon"
                                                            className="w-4 h-4 mr-2"
                                                        />
                                                    )}
                                                    {item.label}
                                                </DropdownMenuItem>
                                            );
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                // Not logged in
                                <button
                                    onClick={() => toggleModal(ModalTypeEnum.Login)}
                                    className="flex items-center text-[#FFB347]"
                                >
                                    <img src={ProfileIcon} alt="icon" />
                                    <p className="pl-2">Login</p>
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
