import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Data2 } from '../models/PostData';

interface CommentsState {
  comments: { [key: string]: Partial<Data2>[] };
}

const initialState: CommentsState = {
  comments: {},
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    postComment: (
      state,
      action: PayloadAction<{ id: string; comment: Partial<Data2> }>
    ) => {
      const { id, comment } = action.payload;

      if (!state.comments[id]) {
        state.comments[id] = [comment];
      } else {
        state.comments[id] = [...state.comments[id], comment];
      }
    },
  },
});

export const { postComment } = commentsSlice.actions;

export const selectComments = (id: string) => (state: RootState) =>
  state.comments.comments[id] || [];

export default commentsSlice.reducer;
