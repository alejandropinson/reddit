import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export enum VoteDir {
  Upvote = 1,
  Downvote = -1,
  Reset = 0,
}

interface VotesState {
  votes: { [key: string]: VoteDir };
}

const initialState: VotesState = {
  votes: {},
};

export const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    vote: (state, action: PayloadAction<{ id: string; dir: VoteDir }>) => {
      const { id, dir } = action.payload;

      state.votes[id] = dir;
    },
  },
});

export const { vote } = votesSlice.actions;

export const selectVote = (id: string) => (state: RootState) =>
  state.votes.votes[id];

export default votesSlice.reducer;
