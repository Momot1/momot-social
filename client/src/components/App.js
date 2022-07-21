// client/src/components/App.js
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import Login from "../features/user/Login";
import Home from "../features/posts/Home";
import Navbar from "./Navbar";
import Signup from "../features/user/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Logout from "../features/user/Logout";
import "./css/app.css";
import ForgotPassword from "../features/user/ForgotPassword";
import Profile from "../features/user/Profile";
import ChangePassword from "../features/user/ChangePassword";
import ConfirmAccount from "../features/user/ConfirmAccount";
import ResetPasswordForm from "../features/user/ResetPasswordForm";
import PasswordResetMessage from "../features/user/PasswordResetMessage";
import PostPage from "../features/posts/PostPage";
import { fetchPosts } from "../features/posts/postSlicer";
import NewPost from "../features/posts/NewPost";
import SearchedUsers from "../features/user/SearchedUsers";

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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/:username/profile">
          <Profile />
        </Route>
        <Route path="/:username/change-password">
          <ChangePassword />
        </Route>
        <Route path="/accounts/confirm/:confirm_token">
          <ConfirmAccount />
        </Route>
        <Route path="/reset-password/:password_reset_token">
          <ResetPasswordForm />
        </Route>
        <Route exact path="/reset-password-message">
          <PasswordResetMessage />
        </Route>
        <Route exact path="/posts/new">
          <NewPost />
        </Route>
        <Route path="/posts/:id">
          <PostPage />
        </Route>
        <Route path="/users/search=:search">
          <SearchedUsers />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
