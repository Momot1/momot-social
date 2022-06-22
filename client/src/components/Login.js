import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

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
        });
      } else {
        resp.json().then(setErrors);
      }
    });
  }

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div>
      {user ? <Redirect to="/" /> : null}
      <form onSubmit={handleLogin}>
        <div>
          <input name="username" value={formData.username} type="text" placeholder="Username/Email" onChange={updateFormData} />
        </div>
        <div>
          <input name="password" value={formData.password} type="password" placeholder="Password" onChange={updateFormData} />
        </div>
        <button type="submit">Login</button>
        <br />
        <Link to="/signup">Don't have an account? Create one</Link>
      </form>
      {errors.error ? <div className="alert alert-danger form-font-size mx-auto">{errors.error}</div> : null}
    </div>
  );
}

export default Login;
