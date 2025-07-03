import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from './Header';
import SidebarComponent from './Sidebar';
import styles from './index.module.css';
import { DOTS as DotsIcon } from '@constants/icons';
import LoginModal from '@components/Login';
// import { Profile } from 'types';
// import { axios, setUpdateLoginState } from 'utils/axios';
import RegisterModal from '@components/Register';
import { AuthContext, AuthContextProvider } from '@context/AuthContext';

interface Layout {
    isWide: boolean
    children: JSX.Element
    title?: string
}

type ModalType = 'login' | 'register' | 'none';
export enum ModalTypeEnum {
    Login = 'login',
    Register = 'register',
    None = 'none'
};

function Layout({ children, isWide, title }: Layout) {
    const [modalType, setModalType] = useState<ModalType>(ModalTypeEnum.None);
    const { authState: { user } } = useContext(AuthContext);

    // const [profile, setProfile] = useState<null | Profile>(null);
    // setUpdateLoginState((newProfile: null | Profile) => {
    //     setProfile(newProfile);
    //     localStorage.setItem('email', newProfile?.email || '');
    //     localStorage.setItem('username', newProfile?.username || '');
    // });

    // useEffect(() => {
    //     (async function () {
    //         try {
    //             const res = await axios.get('/auth/profile');
    //             if (res?.data) setProfile(res?.data)

    //         } catch (error) {
    //             // ignore
    //             console.log("Loi ne >>>>", { error });
    //         }
    //     })();
    // }, []);

    const toggleModal = (type: ModalType) => {
        // console.log("Toggle Ne")
        setModalType(type);
    }

    return (
        <>
            {modalType === ModalTypeEnum.Register && <RegisterModal toggleModal={toggleModal} />}
            {modalType === ModalTypeEnum.Login && <LoginModal toggleModal={toggleModal} />}
            <div className={styles.container}>
                <SidebarComponent isWide={isWide} />
                <section className={styles.main}>
                    <HeaderComponent user={user} toggleModal={toggleModal}></HeaderComponent>
                    <div className={styles.content}>
                        <div className={styles.pageHeader}>
                            <h2 className={styles.pageTitle}>{title}</h2>
                            <div className="action">
                                <div className="icon">
                                    <img src={`/${DotsIcon}`} alt="icon" />
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