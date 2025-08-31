// src/redux/features/commentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "@/interfaces"
interface CommentState {
    comments: IComment[];
}

const initialState: CommentState = {
    comments: [],
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        // Gán lại danh sách comments (dùng cho fetch list)
        setComments: (state, action: PayloadAction<IComment[]>) => {
            state.comments = action.payload;
        },
        // Add a  new comment
        addComment: (state, action: PayloadAction<IComment>) => {
            state.comments.unshift(action.payload);
        },
        // Delete comment if need
        removeComment: (state, action: PayloadAction<string>) => {
            state.comments = state.comments.filter(c => c.id !== action.payload);
        },
        // update comment: content/like/dislike
        updateComment: (state, action: PayloadAction<IComment>) => {
            const index = state.comments.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.comments[index] = action.payload;
            }
        },
        addReply: (state, action: PayloadAction<IComment>) => {
            const reply = action.payload;
            const parentIdx = state.comments.findIndex(c => c.id === reply.parentId);
            if (parentIdx !== -1) {
                if (!state.comments[parentIdx].replies) {
                    state.comments[parentIdx].replies = [];
                }
                state.comments[parentIdx].replies.unshift(reply);
            }
        }
    },
});

export const { setComments, addComment, removeComment, updateComment, addReply } = commentSlice.actions;

export default commentSlice.reducer;