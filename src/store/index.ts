import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './commentsSlice';
import votesReducer from './votesSlice';

const store = configureStore({
  reducer: {
    comments: commentsReducer,
    votes: votesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
