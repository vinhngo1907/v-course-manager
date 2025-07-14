import React, { useContext } from 'react';
import { PROFILE as ProfileIcon, SEARCH as SearchIcon, LOGOUT as LogoutIcon } from '@/constants/icons';
import styles from './index.module.css';
import { ModalTypeEnum } from '..';
import { IUser } from '@/interfaces';
import { AuthContext } from '@/context/AuthContext';
import Button from '../Button';

type Props = {
    user: null | IUser;
    toggleModal: Function;
};

export default function Header({ user, toggleModal }: Props) {
    const { logoutUser } = useContext(AuthContext)!
    const logout = () => logoutUser();
    return (
        <header className={styles.header}>
            <div className={styles.wrapperHeader}>
                <div className={styles.headerLeft}>
                    <div className={styles.search}>
                        <div className={styles.searchIcon}>
                            <img src={`${SearchIcon}`} alt="search-icon" />
                        </div>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <ul className={`${styles.icons} flex items-center justify-center`}>
                        <li className="flex items-center">
                            <a
                                href="#"
                                onClick={() => toggleModal(ModalTypeEnum.Login)}
                                className="flex items-center text-[#ffb347]"
                            >
                                <img src={ProfileIcon} alt="icon" />
                                <p className="pl-2">{user && user.fullName}</p>
                            </a>

                            {user && (
                                <Button
                                    onClick={logout} intent="danger"
                                    className="ml-4"
                                >
                                    <img 
                                    src={LogoutIcon} alt="logout-icon" width={25} height={25} 
                                    className='cursor-pointer'
                                    />
                                </Button>
                            )}
                        </li>
                    </ul>

                </div>
            </div>
        </header>
    );
}
