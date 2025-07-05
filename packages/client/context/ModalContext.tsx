import { createContext, useState, ReactNode } from 'react';

export type ModalType = 'login' | 'register' | 'none' | 'forgotPass';

export const ModalContext = createContext<{
    modalType: ModalType;
    toggleModal: (type: ModalType) => void;
}>({
    modalType: 'none',
    toggleModal: () => { }
});

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modalType, setModalType] = useState<ModalType>('none');

    const toggleModal = (type: ModalType) => {
        setModalType(type);
    };

    return (
        <ModalContext.Provider value={{ modalType, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};
