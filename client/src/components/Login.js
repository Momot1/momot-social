import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const user = useSelector((state) => state.users.user);
  const errors = useSelector((state) => state.users.errors);

  const dispatch = useDispatch();

  console.log(errors);

  // dispatch({ type: "login", payload: { test: "yo" } });

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
        resp.json().then((user) => dispatch({ type: "login", payload: user }));
      } else {
        resp.json().then((errors) => dispatch({ type: "addErrors", payload: errors }));
      }
    });
  }

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input name="username" value={formData.username} type="text" placeholder="Username/Email" onChange={updateFormData} />
        </div>
        <div>
          <input name="password" value={formData.password} type="password" placeholder="Password" onChange={updateFormData} />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* {errors.error.length < 1 ? null : <p>errors.error</p>} */}
    </div>
  );
}

export default Login;
