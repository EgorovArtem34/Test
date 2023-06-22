import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostStateType, PostType } from '../types';
import { modifyPosts, setNewPosts, setOldPosts } from '../utils/utils';

export const fetchPreviousPosts = createAsyncThunk(
  'posts/fetchPreviousPosts',
  async (type: boolean, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('actionName', 'MessagesLoad');
    formData.append('messageId', `${type}`);
    const url = 'http://a0830433.xsph.ru/';
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      return rejectWithValue(`error, status ${response.status}`);
    }
    const result = await response.json();
    return result.Messages;
  },
);

export const fetchNewPosts = createAsyncThunk(
  'posts/fetchNewPosts',
  async (id: number, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('actionName', 'MessagesLoad');
    formData.append('messageId', `${id}`);
    const url = 'http://a0830433.xsph.ru/';
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      return rejectWithValue(`error, status ${response.status}`);
    }
    const result = await response.json();
    return result === 'no message' ? [] : result.Messages;
  },
);

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (id: number, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('actionName', 'MessagesLoad');
    formData.append('messageId', `${id}`);
    const url = 'http://a0830433.xsph.ru/';
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      return rejectWithValue(`error, status ${response.status}`);
    }
    const result = await response.json();
    return result.Messages;
  },
);

const initialState: PostStateType = {
  posts: [],
  error: null,
  isLoading: false,
  isOrderNewMessageFromDown: true,
};

const userSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changeOrderNewMessage(state) {
      state.isOrderNewMessageFromDown = !state.isOrderNewMessageFromDown;
    },
    setLike(state, { payload }: PayloadAction<string>) {
      const currentPost = state.posts.find((post) => post.additional_id === payload);
      if (currentPost) {
        const newFavoriteValue = !(currentPost.isFavorite);
        currentPost.isFavorite = newFavoriteValue;
        const favoritesLocalStorage = JSON.parse(localStorage.getItem('favorites') ?? '{}');
        favoritesLocalStorage[payload] = newFavoriteValue;
        const filteredFavorites = Object.fromEntries(
          Object.keys(favoritesLocalStorage).filter((key) => favoritesLocalStorage[key] === true)
            .map((key) => [key, favoritesLocalStorage[key]]),
        );
        localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewPosts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchNewPosts.rejected, (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchNewPosts.fulfilled, (state, { payload }: PayloadAction<PostType[]>) => {
        if (payload.length > 0) {
          const newPosts = setNewPosts(payload);
          const oldPosts = setOldPosts(state.posts);
          state.posts = state.isOrderNewMessageFromDown ? [...oldPosts, ...newPosts]
            : [...newPosts, ...oldPosts];
        }
        state.error = null;
        state.isLoading = false;
      })

      .addCase(fetchPreviousPosts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchPreviousPosts.rejected, (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchPreviousPosts.fulfilled, (state, { payload }: PayloadAction<PostType[]>) => {
        if (payload) {
          const modifiedPosts = modifyPosts(payload, 'old');
          state.posts = [...state.posts, ...modifiedPosts];
        }
        state.error = null;
        state.isLoading = false;
      })

      .addCase(fetchPosts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchPosts.rejected, (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }: PayloadAction<PostType[]>) => {
        if (payload) {
          const modifiedPosts = modifyPosts(payload);
          state.posts = modifiedPosts;
        }
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { changeOrderNewMessage, setLike } = userSlice.actions;
export default userSlice.reducer;
