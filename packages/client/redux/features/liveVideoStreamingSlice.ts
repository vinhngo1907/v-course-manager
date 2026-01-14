import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "livekit-client";

export interface ParticipantState {
    identity: string;
    name: string;
    audioEnabled: boolean;
    videoEnabled: boolean;
    screenEnabled: boolean;
    isLocal?: boolean;

    // videoTrack?: Track;

    // audioTrack?: Track;
}

interface LiveStreamState {
    participants: Record<string, ParticipantState>;
    isStreamer: boolean;
    roomName: string | null;
    userRole: 'streamer' | 'viewer' | null; 
}

const initialState: LiveStreamState = {
    participants: {},
    isStreamer: false,
    roomName: null,
    userRole: null,
};

const liveVideoStreamingSlice = createSlice({
    name: "liveStreaming",
    initialState,
    reducers: {
        setRoomName(state, action: PayloadAction<string>) {
            state.roomName = action.payload;
        },
        setIsStreamer(state, action: PayloadAction<boolean>) {
            state.isStreamer = action.payload;
        },

        addOrUpdateParticipant(state, action: PayloadAction<ParticipantState>) {
            const p = action.payload;
            state.participants[p.identity] = {
                ...state.participants[p.identity],
                ...p
            };
        },

        removeParticipant(state, action: PayloadAction<string>) {
            delete state.participants[action.payload];
        },

        updateUser(state, action: PayloadAction<Partial<ParticipantState>>) {
            const local = Object.values(state.participants).find((p) => p.isLocal);
            if (!local) return;

            const id = local.identity;

            state.participants[id] = {
                ...state.participants[id],
                ...action.payload,
            };
        },
        setUserRole(state, action: PayloadAction<'streamer' | 'viewer'>) {
            state.userRole = action.payload;
            state.isStreamer = action.payload === 'streamer';
        }
    },
});

export const {
    setRoomName,
    setIsStreamer,
    addOrUpdateParticipant,
    removeParticipant,
    updateUser,
    setUserRole
} = liveVideoStreamingSlice.actions;

export default liveVideoStreamingSlice.reducer;
