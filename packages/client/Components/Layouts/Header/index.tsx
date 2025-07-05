import React, { useContext } from 'react';
import { PROFILE as ProfileIcon, SEARCH as SearchIcon, LOGOUT as LogoutIcon } from '@/constants/icons';
import styles from './index.module.css';
import { ModalTypeEnum } from '..';
import { IUser } from '@/interfaces';
import { AuthContext } from '@/context/AuthContext';

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
                        <li>
                            <a href="#" onClick={() => toggleModal(ModalTypeEnum.Login)} className='text-[#ffb347]'>
                                <img src={`${ProfileIcon}`} alt="icon" />
                                <p className='pl-2'>{user && user.fullName}</p>
                            </a>
                        </li>
                        {user && (
                            <li>
                                <button
                                    onClick={logout}
                                    className='flex text-[#ffb347] ml-4'
                                >
                                    <img src={`${LogoutIcon}`} alt="logout-icon" />
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}
