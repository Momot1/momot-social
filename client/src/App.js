// client/src/components/App.js
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./features/user/Login";
import Home from "./features/posts/Home";
import Navbar from "./components/Navbar";
import Signup from "./features/user/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Logout from "./features/user/Logout";
import "./app.css";
import ForgotPassword from "./features/user/ForgotPassword";
import Profile from "./features/user/Profile";
import ChangePassword from "./features/user/ChangePassword";
import ConfirmAccount from "./features/user/ConfirmAccount";
import ResetPasswordForm from "./features/user/ResetPasswordForm";
import PasswordResetMessage from "./features/user/PasswordResetMessage";
import PostPage from "./features/posts/PostPage";
import { fetchPosts } from "./features/posts/postSlicer";
import NewPost from "./features/posts/NewPost";
import SearchedUsers from "./features/user/SearchedUsers";
import UserFriends from "./features/user/UserFriends";
import NotFound from "./components/NotFound";
import Messages from "./features/user/Messages";
import Message from "./features/user/Message";
import SearchedPosts from "./features/posts/SearchedPosts";
import ConfirmEmailMessage from "./features/user/ConfirmEmailMessage";
import UserPosts from "./features/posts/UserPosts";
import NewMessage from "./features/user/NewMessage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          console.log(user);
          dispatch({ type: "login", payload: user });
        });
      }
    });

    dispatch(fetchPosts());
    // fetch("/posts")
    //   .then((resp) => resp.json())
    //   .then((posts) => {
    //     dispatch({ type: "setPosts", payload: posts });
    //   });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/:username/profile">
          <Profile />
        </Route>
        <Route exact path="/:username/change-password">
          <ChangePassword />
        </Route>
        <Route exact path="/:username/posts">
          <UserPosts />
        </Route>
        <Route exact path="/accounts/confirm/:confirm_token">
          <ConfirmAccount />
        </Route>
        <Route exact path="/reset-password/:password_reset_token">
          <ResetPasswordForm />
        </Route>
        <Route exact path="/reset-password-message">
          <PasswordResetMessage />
        </Route>
        <Route exact path="/posts/new">
          <NewPost />
        </Route>
        <Route exact path="/posts/:id">
          <PostPage />
        </Route>
        <Route exact path="/search-posts/search=:search">
          <SearchedPosts />
        </Route>
        <Route exact path="/users/search=:search">
          <SearchedUsers />
        </Route>
        <Route exact path="/:username/friends">
          <UserFriends />
        </Route>
        <Route exact path="/:username/messages">
          <Messages />
        </Route>
        <Route exact path="/:username/messages/new">
          <NewMessage />
        </Route>
        <Route exact path="/:username/messages/to=:otheruser">
          <Message />
        </Route>
        <Route exact path="/confirm-email">
          <ConfirmEmailMessage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
