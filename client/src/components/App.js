// client/src/components/App.js
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";
import Signup from "./Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Logout from "./Logout";

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

  console.log("run twice");
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
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
