import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postsSlice';

const store = configureStore({
  reducer: {
    postsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
