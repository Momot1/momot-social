import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postSlicer";
import usersReducer from "./features/user/userSlicer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});

export default store;
