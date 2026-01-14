import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./features/videoSlice";
import liveVideoStreamingReducer from './features/liveVideoStreamingSlice';
import authReducer from './features/authSlice';
import commentReducer from './features/commentSlice';
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        video: videoReducer,
        comment: commentReducer,
        liveVideoStreaming: liveVideoStreamingReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
