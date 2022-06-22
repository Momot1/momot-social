import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
        resp.json().then((errors) => console.log(errors));
      }
    });
  }

  console.log(user);

  return (
    <div>
      {user ? <Redirect to="/" /> : null}
      <form onSubmit={handleSignup} autoComplete="disabled">
        <div>
          <input name="first_name" value={formData.first_name} onChange={updateFormData} placeholder="First Name" type="text" />
        </div>
        <div>
          <input name="last_name" value={formData.last_name} onChange={updateFormData} placeholder="Last Name" type="text" />
        </div>
        <div>
          <input name="birthday" value={formData.birthday} onChange={updateFormData} type="date" />
        </div>
        <div>
          <input name="email" value={formData.email} onChange={updateFormData} placeholder="Email" type="email" />
        </div>
        <div>
          <input name="username" value={formData.username} onChange={updateFormData} placeholder="Username" type="text" />
        </div>
        <div>
          <input name="password" value={formData.password} onChange={updateFormData} placeholder="Password" type="password" />
        </div>
        <div>
          <input
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={updateFormData}
            placeholder="Password Confirmation"
            type="password"
          />
        </div>
        <button type="submit">Sign Up</button>
        <br />
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
}

export default Signup;
