import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./css/signup.css";

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    birthday: "",
    first_name: "",
    last_name: "",
  });
  const [errors, setErrors] = useState({ errors: [] });

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSignup(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          dispatch({ type: "login", payload: user });
          history.push("/");
        });
      } else {
        resp.json().then((errors) => setErrors(errors));
      }
    });
  }

  console.log(errors);

  const errorElements = errors.errors.map((error) => (
    <div key={error} className="alert alert-danger form-font-size mx-auto">
      - {error}
    </div>
  ));

  return (
    <div id="signup-div">
      {user ? <Redirect to="/" /> : null}
      <form onSubmit={handleSignup} autoComplete="disabled">
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="first_name">
            First Name
          </span>
          <input
            name="first_name"
            value={formData.first_name}
            onChange={updateFormData}
            placeholder="First Name"
            type="text"
            className="form-control"
            aria-describedby="first_name"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="last_name">
            Last Name
          </span>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={updateFormData}
            placeholder="Last Name"
            type="text"
            className="form-control"
            aria-describedby="last_name"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="birthday">
            Birthday
          </span>
          <input
            name="birthday"
            value={formData.birthday}
            onChange={updateFormData}
            type="date"
            className="form-control"
            aria-describedby="birthday"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="email">
            Email
          </span>
          <input
            name="email"
            value={formData.email}
            onChange={updateFormData}
            placeholder="Email"
            type="email"
            className="form-control"
            aria-describedby="email"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="username">
            @
          </span>
          <input
            name="username"
            value={formData.username}
            onChange={updateFormData}
            placeholder="Username"
            type="text"
            className="form-control"
            aria-describedby="username"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="password">
            Password
          </span>
          <input
            name="password"
            value={formData.password}
            onChange={updateFormData}
            placeholder="Password"
            type="password"
            className="form-control"
            aria-describedby="password"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="password_confirmation">
            Confirm Password
          </span>
          <input
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={updateFormData}
            placeholder="Password Confirmation"
            type="password"
            className="form-control"
            aria-describedby="password_confirmation"
          />
        </div>
        <button type="submit" className="btn btn-lg btn-secondary">
          Sign Up
        </button>
        <br />
        <Link to="/login">Already have an account? Login</Link>
      </form>
      {errors.errors.length > 0 ? errorElements : null}
    </div>
  );
}

export default Signup;
