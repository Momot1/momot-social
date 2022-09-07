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
    searchedPosts: [],
  },
  reducers: {
    postAdded(state, action) {
      state.posts.unshift(action.payload);
    },
    postRemoved(state, action) {
      state.posts.splice(
        state.posts.findIndex((post) => post.id === action.payload.id),
        1
      );
    },
    searchedPost(state, action) {
      state.searchedPosts = action.payload;
    },
    likeAdded(state, action) {
      let post = state.posts.find((post) => post.id === action.payload.id);
      post.likes = post.likes + 1;
    },
    likeRemoved(state, action) {
      let post = state.posts.find((post) => post.id === action.payload.id);
      post.likes = post.likes - 1;
    },
    commentAdded(state, action) {
      let post = state.posts.find((post) => post.id == action.payload.id);
      state.posts.find((post) => post.id == action.payload.id).comments.push(action.payload.comment);
      post.comments_count = post.comments_count + 1;
    },
    commentRemoved(state, action) {
      let post = state.posts.find((post) => post.id === action.payload.id);
      post.comments.splice(post.comments.findIndex((comment) => comment.id === action.payload.id));
      post.comments_count = post.comments_count - 1;
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

export const { postAdded, postRemoved, searchedPost, likeAdded, likeRemoved, commentAdded, commentRemoved } = postsSlice.actions;

export default postsSlice.reducer;
