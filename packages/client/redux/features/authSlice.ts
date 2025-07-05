import { IUser } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    authLoading?: boolean;
    isAuthenticated: boolean;
    user: IUser | null;
}

const initialState: AuthState = {
    // authLoading: true,
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (
            state,
            action: PayloadAction<{
                isAuthenticated: boolean;
                user: IUser | null;
                // authLoading: boolean;
            }>
        ) => {
            state.authLoading = false;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        },
    },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;