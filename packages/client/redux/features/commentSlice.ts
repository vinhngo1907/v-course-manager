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
        // Thêm 1 comment mới
        addComment: (state, action: PayloadAction<IComment>) => {
            state.comments.unshift(action.payload);
        },
        // Xoá comment nếu cần
        removeComment: (state, action: PayloadAction<string>) => {
            state.comments = state.comments.filter(c => c.id !== action.payload);
        },
        // Hoặc update comment, ví dụ like/dislike
        updateComment: (state, action: PayloadAction<IComment>) => {
            const index = state.comments.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.comments[index] = action.payload;
            }
        },
    },
});

export const { setComments, addComment, removeComment, updateComment } = commentSlice.actions;

export default commentSlice.reducer;