// client/src/components/App.js
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import Login from "../features/user/Login";
import Home from "./Home";
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

function App() {
  // const dispatch = useDispatch();

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          dispatch({ type: "login", payload: user });
        });
      }
    });
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
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
