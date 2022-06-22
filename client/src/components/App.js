// client/src/components/App.js
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";

function App() {
  console.log("run twice");
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
