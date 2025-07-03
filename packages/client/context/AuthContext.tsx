import React, { createContext, useEffect } from 'react'
import { AppDispatch, RootState, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/features/authSlice';
import setAuthToken from '@/utils/setAuthToken';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '@/constants/configs';
import { axios } from '@/utils/axios';

interface AuthContextType {
    authState: RootState['auth'],
    loginUser: (userForm: { username: string, password: string }) => Promise<any>,
    loadUser: () => Promise<void>

}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useAppSelector((state: RootState) => state.auth);
    const loginUser = async (userForm: { username: string, password: string }) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (res.data) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
            }
            await loadUser();
            return res.data;
        } catch (error) {
            dispatch(setAuth({
                authLoading: true,
                isAuthenticated: true,
                user: null
            }));
        }

    };

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}/auth/profile`);
            if (response.data) {
                dispatch(setAuth({
                    isAuthenticated: true, user: response.data, authLoading: false
                }));
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken('')
            dispatch(setAuth({
                isAuthenticated: false, user: null, authLoading: false
            }))
        }
    }

    useEffect(() => {
        (async () => {
            await loadUser();
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ authState, loginUser, loadUser }}>
            {children}
        </AuthContext.Provider>
    );
}
