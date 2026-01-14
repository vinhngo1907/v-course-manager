import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Video {
    id: string;
    title: string;
    description: string;
    videoURL: string;
    [key: string]: any;
}

interface VideosServiceState {
    isFetching: boolean;
    videos: Video[];
    video: Video | null;
    error: string | null;
}

const initialState: VideosServiceState = {
    isFetching: false,
    videos: [],
    video: null,
    error: null,
};

const videosServicesSlice = createSlice({
    name: "videosServices",
    initialState,
    reducers: {
        fetchVideosStarted(state) {
            state.isFetching = true;
        },
        fetchVideosSuccess(state, action: PayloadAction<Video[]>) {
            state.videos = action.payload;
            state.isFetching = false;
        },
        fetchVideosFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isFetching = false;
        },
        fetchVideoStarted(state) {
            state.isFetching = true;
        },
        fetchVideoSuccess(state, action: PayloadAction<Video>) {
            state.video = action.payload;
            state.isFetching = false;
        },
        fetchVideoFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isFetching = false;
        },
    },
});

export const {
    fetchVideosStarted,
    fetchVideosSuccess,
    fetchVideosFailure,
    fetchVideoStarted,
    fetchVideoSuccess,
    fetchVideoFailure,
} = videosServicesSlice.actions;

export default videosServicesSlice.reducer;
