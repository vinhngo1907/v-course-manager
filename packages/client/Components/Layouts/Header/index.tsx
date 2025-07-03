import React from 'react';
import { PROFILE as ProfileIcon, SEARCH as SearchIcon } from '@constants/icons';
import { Profile } from '../../../types';
import styles from './index.module.css';
import { ModalTypeEnum } from '..';
import { IUser } from '@interfaces/index';

type Props = {
    user: null | IUser;
    toggleModal: Function;
};

export default function Header({ user, toggleModal }: Props) {
    return (
        <header className={styles.header}>
            <div className={styles.wrapperHeader}>
                <div className={styles.headerLeft}>
                    <div className={styles.search}>
                        <div className={styles.searchIcon}>
                            <img src={`/${SearchIcon}`} alt="search-icon" />
                        </div>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <ul className={styles.icons}>
                        <li>
                            <a href="#" onClick={() => toggleModal(ModalTypeEnum.Login)}>
                                <img src={`/${ProfileIcon}`} alt="icon" />
                                {user && user.fullName}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
