import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostStateType } from '../types';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (id: number, { rejectWithValue }) => {
    const url = 'http://a0830433.xsph.ru/';
    const body = `actionName=MessagesLoad&messageId=${id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body,
    });
    if (!response.ok) {
      return rejectWithValue(`error, status ${response.status}`);
    }
    return response.json();
  },
);

const initialState: PostStateType = {
  posts: [],
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchPosts.rejected, (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.error = null;
        state.posts = payload.Messages;
        state.isLoading = false;
      });
  },
});

export const { } = userSlice.actions;
export default userSlice.reducer;
