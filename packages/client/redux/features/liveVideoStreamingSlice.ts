import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Preferences {
    audio: boolean;
    video: boolean;
    screen: boolean;
}

export interface Participant {
    name: string;
    audio: boolean;
    video: boolean;
    screen: boolean;
    currentUser?: boolean;
    avatarColor?: string;
    peerConnection?: RTCPeerConnection;
}

interface ParticipantsMap {
    [id: string]: Participant;
}

interface LiveStreamState {
    mainStream: MediaStream | null;
    participants: ParticipantsMap;
    currentUser: ParticipantsMap | null;
    isStreamer: boolean;
    streamer: any;
    HTMLParticipants: Record<string, any>;
    streamId: string | null;
}

const initialState: LiveStreamState = {
    mainStream: null,
    participants: {},
    currentUser: null,
    isStreamer: false,
    streamer: null,
    HTMLParticipants: {},
    streamId: null,
};

const liveVideoStreamingSlice = createSlice({
    name: "liveStreaming",
    initialState,
    reducers: {
        setMainStream(state, action: PayloadAction<MediaStream>) {
            state.mainStream = action.payload;
        },
        addParticipant(state, action: PayloadAction<ParticipantsMap>) {
            const newUserId = Object.keys(action.payload)[0];
            state.participants[newUserId] = {
                ...action.payload[newUserId],
                avatarColor: generateColor(),
            };
        },
        setUser(state, action: PayloadAction<ParticipantsMap>) {
            const userId = Object.keys(action.payload)[0];
            state.currentUser = action.payload;
            state.participants[userId] = {
                ...action.payload[userId],
                avatarColor: generateColor(),
            };
        },
        removeParticipant(state, action: PayloadAction<string>) {
            delete state.participants[action.payload];
        },
        updateUser(state, action: PayloadAction<Partial<Participant>>) {
            if (!state.currentUser) return;
            const userId = Object.keys(state.currentUser)[0];
            state.currentUser[userId] = {
                ...state.currentUser[userId],
                ...action.payload,
            };
        },
        updateParticipant(state, action: PayloadAction<ParticipantsMap>) {
            const newUserId = Object.keys(action.payload)[0];
            state.participants[newUserId] = {
                ...state.participants[newUserId],
                ...action.payload[newUserId],
            };
        },
         updateParticipantField(
            state,
            action: PayloadAction<{
                userId: string;
                field: keyof Participant;
                value: any;
            }>
        ) {
            const { userId, field, value } = action.payload;
            if (state.participants[userId]) {
                (state.participants[userId] as any)[field] = value;
            }
        },
        setIsStreamer(state, action: PayloadAction<boolean>) {
            state.isStreamer = action.payload;
        },
        setStreamer(state, action: PayloadAction<any>) {
            state.streamer = action.payload;
        },
        setStreamId(state, action: PayloadAction<string>) {
            state.streamId = action.payload;
        },
    },
});

function generateColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export const {
    setMainStream,
    addParticipant,
    setUser,
    removeParticipant,
    updateUser,
    updateParticipant,
    updateParticipantField,
    setIsStreamer,
    setStreamer,
    setStreamId,
} = liveVideoStreamingSlice.actions;

export default liveVideoStreamingSlice.reducer;