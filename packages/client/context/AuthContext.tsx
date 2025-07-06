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
    registerUser: (userForm: { username: string, password: string, email: string }) => Promise<any>,
    loadUser: () => Promise<void>,
    logoutUser: () => Promise<void>,
    forgotPass: (userForm: { email: string }) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useAppSelector((state: RootState) => state.auth);
    const loginUser = async (userForm: { username: string, password: string }) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, userForm);
            console.log("Login User",{res})
            if (res.data) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
            }
            await loadUser();
            return res.data;
        } catch (error) {
            dispatch(setAuth({
                isAuthenticated: false,
                user: null
            }));
        }

    };

    const registerUser = async (userForm: { username: string, password: string }) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/register`, userForm);
            if (res.data) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
            }
            await loadUser();
            return res.data;
        } catch (error) {
            dispatch(setAuth({
                isAuthenticated: false,
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
            console.log("Load User ",{ response })
            if (response.data) {
                dispatch(setAuth({
                    isAuthenticated: true, user: response.data
                }));
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch(setAuth({
                isAuthenticated: false, user: null
            }))
        }
    }

    const logoutUser = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        await axios.get("/auth/logout");
        dispatch(setAuth(
            { isAuthenticated: false, user: null }
        ))
    }

    const forgotPass = async (userForm: { email: string }) => {
        const res = await axios.post("/auth/forgot_password", userForm);
        return res.data
    }

    useEffect(() => {
        (async () => {
            await loadUser();
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ authState, loginUser, loadUser, registerUser, logoutUser, forgotPass }}>
            {children}
        </AuthContext.Provider>
    );
}
