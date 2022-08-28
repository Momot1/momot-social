import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./css/forgotPassword.css";

function ResetPasswordForm() {
  const token = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
    password_reset_token: token.password_reset_token,
  });

  const user = useSelector((state) => state.users.user);

  if (user) {
    history.push("/");
  }

  function updateForm(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handlePasswordReset(e) {
    e.preventDefault();

    const form = e.target;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    form.classList.add("was-validated");

    if (form.checkValidity() === true) {
      fetch("/resetpassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((message) => {
            history.push("/login");
            alert(message.message);
          });
        } else {
          resp.json().then((error) => {
            history.push("/forgot-password");
            alert(error.message);
          });
        }
      });
    }
  }

  return (
    <div className="forgot-password-container">
      <form onSubmit={handlePasswordReset} className="needs-validation" id="reset-password-form" noValidate>
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="password">
            Password
          </span>
          <input className="form-control" type="password" value={formData.password} onChange={updateForm} name="password" required />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="password_confirmation">
            Confirm Password
          </span>
          <input
            className="form-control"
            type="password"
            value={formData.password_confirmation}
            onChange={updateForm}
            name="password_confirmation"
            required
          />
        </div>
        <button type="submit" className="btn btn-lg btn-secondary">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
