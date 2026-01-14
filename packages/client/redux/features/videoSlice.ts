import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoDetails {
    title?: string;
    description?: string;
}

interface VideoState {
    videoDetails: VideoDetails | null;
    isUploading: boolean;
    progressUploading: string;
    uploaded: boolean;
    errorUpload: string | null;
}

const initialState: VideoState = {
    videoDetails: null,
    isUploading: false,
    progressUploading: "0%",
    uploaded: false,
    errorUpload: null,
};

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideoDetails(state, action: PayloadAction<VideoDetails>) {
            state.videoDetails = {
                ...state.videoDetails,
                ...action.payload,
            };
        },
        toggleIsUploading(state) {
            state.isUploading = !state.isUploading;
        },
        setProgress(state, action: PayloadAction<string>) {
            state.progressUploading = action.payload;
        },
        setUploaded(state, action: PayloadAction<boolean>) {
            state.uploaded = action.payload;
        },
    },
});

export const {
    setVideoDetails,
    toggleIsUploading,
    setProgress,
    setUploaded,
} = videoSlice.actions;

export default videoSlice.reducer;