import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  function onPasswordReset(e) {
    e.preventDefault();
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
