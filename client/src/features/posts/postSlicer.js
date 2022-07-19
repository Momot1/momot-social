// const initialState = { status: "idle", errors: [] };
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchposts", () => {
  return fetch("/posts")
    .then((resp) => resp.json())
    .then((posts) => posts);
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: [],
    posts: [],
  },
  reducers: {
    postAdded(state, action) {
      state.posts.push(action.payload);
    },
    postRemoved(state, action) {
      state.posts.splice(
        state.posts.findIndex((post) => post.id === action.payload.id),
        1
      );
    },
  },
  extraReducers: {
    [fetchPosts.pending](state) {
      state.status = "loading";
    },
    [fetchPosts.fulfilled](state, action) {
      state.posts = action.payload;
      state.status = "idle";
    },
  },
});

export const { postAdded, postRemoved } = postsSlice.actions;

export default postsSlice.reducer;
