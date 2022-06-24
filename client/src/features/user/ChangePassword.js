import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ChangePassword() {
  const user = useSelector((state) => state.users.user);

  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({ errors: [] });

  const history = useHistory();

  function onChangePassword(e) {
    e.preventDefault();

    const form = e.target;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    form.classList.add("was-validated");

    if (form.checkValidity() === true) {
      fetch("/changepassword", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((resp) => {
        if (resp.ok) {
          alert("Your password has successfully been changed.");
          history.push(`/${user.username}/profile`);
        } else {
          resp.json().then((errors) => {
            setErrors(errors);
            setFormData({ old_password: "", password: "", password_confirmation: "" });
          });
        }
      });
    }
  }

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const errorElements = errors.errors.map((error) => (
    <div key={error} className="alert alert-danger form-font-size mx-auto">
      - {error}
    </div>
  ));

  return (
    <div>
      <form className="needs-validation" noValidate onSubmit={onChangePassword}>
        <div className="input-group mb-3">
          <span className="input-group-text">Old Password</span>
          <input
            className="form-control"
            value={formData.old_password}
            onChange={updateFormData}
            name="old_password"
            type="password"
            required
          ></input>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">New Password</span>
          <input className="form-control" value={formData.password} onChange={updateFormData} name="password" type="password" required></input>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Confirm New Password</span>
          <input
            className="form-control"
            value={formData.password_confirmation}
            onChange={updateFormData}
            name="password_confirmation"
            type="password"
            required
          ></input>
        </div>
        <button type="submit">Change</button>
      </form>
      {errors.errors.length > 0 ? errorElements : null}
    </div>
  );
}

export default ChangePassword;
