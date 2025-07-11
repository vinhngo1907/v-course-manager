import React, { JSX, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from './Header';
import SidebarComponent from './Sidebar';
import styles from './index.module.css';
import { DOTS as DotsIcon } from '@/constants/icons';
import LoginModal from '@/Components/Login';
// import { Profile } from 'types';
// import { axios, setUpdateLoginState } from 'utils/axios';
import RegisterModal from '@/Components/Register';
import { AuthContext } from '@/context/AuthContext';
import { ModalContext } from '@/context/ModalContext';
import ForgotPasswordModal from '../ForgotPassword';

interface Layout {
    isWide: boolean
    children: JSX.Element
    title?: string
}

// type ModalType = 'login' | 'register' | 'none';
export enum ModalTypeEnum {
    Login = 'login',
    Register = 'register',
    ForgotPass = "forgotPass",
    None = 'none'
};

function Layout({ children, isWide, title }: Layout) {
    const { modalType, toggleModal } = useContext(ModalContext);
    const { authState: { user } } = useContext(AuthContext)!;

    return (
        <>
            {modalType === ModalTypeEnum.Register && <RegisterModal toggleModal={toggleModal} />}
            {modalType === ModalTypeEnum.Login && <LoginModal toggleModal={toggleModal} />}
            {modalType === ModalTypeEnum.ForgotPass && <ForgotPasswordModal toggleModal={toggleModal} />}
            <div className={styles.container}>
                <SidebarComponent isWide={isWide} />
                <section className={styles.main}>
                    <HeaderComponent user={user} toggleModal={toggleModal}></HeaderComponent>
                    <div className={styles.content}>
                        <div className={styles.pageHeader}>
                            <h2 className={`${styles.pageTitle} text-[#FFF1DC]`}>{title}</h2>
                            <div className="action">
                                <div className="icon">
                                    <img src={`${DotsIcon}`} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="page-content">{children}</div>
                    </div>
                </section>
            </div>
        </>
    );
}

Layout.defaultProps = {
    isWide: false
}

Layout.propsType = {
    isWide: PropTypes.bool,
    title: PropTypes.string
}

export default Layout;