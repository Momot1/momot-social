import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./css/login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();
    const form = e.target;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    form.classList.add("was-validated");

    if (form.checkValidity() === true) {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            dispatch({ type: "login", payload: user });
            window.history.go(-1);
          });
        } else {
          resp.json().then(setErrors);
        }
      });
    }
  }

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div id="login-div">
      {user ? <Redirect to="/" /> : null}
      <form onSubmit={handleLogin} id="login-form" noValidate className="needs-validation">
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="username">
            @
          </span>
          <input
            name="username"
            value={formData.username}
            type="text"
            id="validationCustom01"
            placeholder="Username/Email"
            onChange={updateFormData}
            className="form-control"
            aria-describedby="Username"
            autoComplete="username"
            required
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" aira-label="password">
            Password
          </span>
          <input
            name="password"
            value={formData.password}
            type="password"
            placeholder="Password"
            onChange={updateFormData}
            className="form-control"
            aria-describedby="Password"
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit" className="btn btn-lg btn-secondary">
          Login
        </button>
        <br />
        <Link to="/forgot-password">Forgot your password?</Link>
        <br />
        <Link to="/signup">Don't have an account? Create one</Link>
      </form>
      {errors.error ? <div className="alert alert-danger form-font-size mx-auto">{errors.error}</div> : null}
    </div>
  );
}

export default Login;
