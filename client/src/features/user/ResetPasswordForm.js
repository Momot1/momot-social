import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./css/forgotPassword.css";

function ResetPasswordForm() {
  const token = useParams();
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
    password_reset_token: token.password_reset_token,
  });

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
          resp.json().then(console.log);
        } else {
        }
      });
      console.log(formData);
    }
  }

  return (
    <div className="forgot-password-container">
      <form onSubmit={handlePasswordReset} className="needs-validation" noValidate>
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
