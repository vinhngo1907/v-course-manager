import React, { JSX, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from './Header';
import SidebarComponent from './Sidebar';
import styles from './index.module.css';
import { DOTS as DotsIcon } from '@/constants/icons';
import LoginModal from '@/Components/Login';
import RegisterModal from '@/Components/Register';
import { AuthContext } from '@/context/AuthContext';
import { ModalContext } from '@/context/ModalContext';
import ForgotPasswordModal from '../ForgotPassword';
import { useSidebar } from '@/store/use-sidebar';
import { ArrowLeftFromLine, ArrowLeftFromLineIcon, ArrowRightFromLine, ArrowRightFromLineIcon } from "lucide-react";

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
    const { collapsed, toggle } = useSidebar();

    return (
        <>
            {modalType === ModalTypeEnum.Register && <RegisterModal toggleModal={toggleModal} />}
            {modalType === ModalTypeEnum.Login && <LoginModal toggleModal={toggleModal} />}
            {modalType === ModalTypeEnum.ForgotPass && <ForgotPasswordModal toggleModal={toggleModal} />}
            <div className={styles.container}>
                {/* <SidebarComponent isWide={isWide} /> */}
                <SidebarComponent isWide={collapsed} />
                <section className={styles.main}>
                    <HeaderComponent user={user} toggleModal={toggleModal} />
                    <button
                        onClick={toggle}
                        className={`
                        absolute top-55 z-50 rounded-full bg-[#FFB347] p-2 shadow
                        transition-all duration-300
                        ${collapsed ? "left-[90px]" : "left-[260px]"}
                    `}
                        aria-label="Toggle sidebar"
                    >
                        {collapsed ? <ArrowRightFromLine size={18} /> : <ArrowLeftFromLine size={18} />}
                    </button>
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