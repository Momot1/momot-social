// client/src/components/App.js
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as pages from "./imports";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./app.css";
import { fetchPosts } from "./features/posts/postSlicer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          dispatch({ type: "login", payload: user });
        });
      }
    });

    dispatch(fetchPosts());
  }, []);

  return (
    <BrowserRouter>
      <pages.Navbar />
      <Switch>
        <Route exact path="/login">
          <pages.Login />
        </Route>
        <Route exact path="/signup">
          <pages.Signup />
        </Route>
        <Route exact path="/logout">
          <pages.Logout />
        </Route>
        <Route exact path="/forgot-password">
          <pages.ForgotPassword />
        </Route>
        <Route exact path="/:username/profile">
          <pages.Profile />
        </Route>
        <Route exact path="/:username/change-password">
          <pages.ChangePassword />
        </Route>
        <Route exact path="/:username/posts">
          <pages.UserPosts />
        </Route>
        <Route exact path="/accounts/confirm/:confirm_token">
          <pages.ConfirmAccount />
        </Route>
        <Route exact path="/reset-password/:password_reset_token">
          <pages.ResetPasswordForm />
        </Route>
        <Route exact path="/reset-password-message">
          <pages.PasswordResetMessage />
        </Route>
        <Route exact path="/posts/new">
          <pages.NewPost />
        </Route>
        <Route exact path="/posts/:id">
          <pages.PostPage />
        </Route>
        <Route exact path="/search-posts/search=:search">
          <pages.SearchedPosts />
        </Route>
        <Route exact path="/users/search=:search">
          <pages.SearchedUsers />
        </Route>
        <Route exact path="/:username/friends">
          <pages.UserFriends />
        </Route>
        <Route exact path="/:username/messages">
          <pages.Messages />
        </Route>
        <Route exact path="/:username/messages/new">
          <pages.NewMessage />
        </Route>
        <Route exact path="/:username/messages/to=:otheruser">
          <pages.Message />
        </Route>
        <Route exact path="/confirm-email">
          <pages.ConfirmEmailMessage />
        </Route>
        <Route exact path="/">
          <pages.Home />
        </Route>
        <Route path="/">
          <pages.NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
