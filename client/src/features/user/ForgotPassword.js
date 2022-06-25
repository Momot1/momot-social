import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  function onPasswordReset(e) {
    e.preventDefault();

    fetch("/send_email_to_reset_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((resp) => resp.json())
      .then(console.log);
  }

  return (
    <div>
      <form id="forgot-password-form" onSubmit={onPasswordReset}>
        <div className="input-group mb-3">
          <span className="input-group-text">Please enter your email address: </span>
          <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
