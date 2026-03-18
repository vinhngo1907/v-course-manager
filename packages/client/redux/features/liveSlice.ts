import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LiveKitParticipant {
  id: string;
  name: string;
  videoTrack?: MediaStreamTrack;
  audioTrack?: MediaStreamTrack;
  autoSubscribe?: MediaStreamTrack;
}

interface LiveState {
  roomName: string | null;
  participants: Record<string, LiveKitParticipant>;
  currentUser: LiveKitParticipant | null;
  isStreamer: boolean;
  streamId: string | null;
}

const initialState: LiveState = {
  roomName: null,
  participants: {},
  currentUser: null,
  isStreamer: false,
  streamId: null,
};

const liveSlice = createSlice({
  name: "live",
  initialState,
  reducers: {
    setRoomName(state, action: PayloadAction<string>) {
      state.roomName = action.payload;
    },

    setCurrentUser(state, action: PayloadAction<LiveKitParticipant>) {
      state.currentUser = action.payload;
      state.participants[action.payload.id] = action.payload;
    },

    addParticipant(state, action: PayloadAction<LiveKitParticipant>) {
      state.participants[action.payload.id] = action.payload;
    },

    updateParticipantTrack(
      state,
      action: PayloadAction<{
        id: string;
        videoTrack?: MediaStreamTrack;
        audioTrack?: MediaStreamTrack;
      }>
    ) {
      const p = state.participants[action.payload.id];
      if (!p) return;

      if (action.payload.videoTrack) p.videoTrack = action.payload.videoTrack;
      if (action.payload.audioTrack) p.audioTrack = action.payload.audioTrack;
    },

    removeParticipant(state, action: PayloadAction<string>) {
      delete state.participants[action.payload];
    },

    setIsStreamer(state, action: PayloadAction<boolean>) {
      state.isStreamer = action.payload;
    },

    setStreamId(state, action: PayloadAction<string | null>) {
      state.streamId = action.payload;
    },
  },
});

export const {
  setRoomName,
  setCurrentUser,
  addParticipant,
  updateParticipantTrack,
  removeParticipant,
  setIsStreamer,
  setStreamId,
} = liveSlice.actions;

export default liveSlice.reducer;
