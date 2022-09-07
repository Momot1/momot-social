import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ConfirmEmailMessage() {
  const user = useSelector((state) => state.users.user);
  const history = useHistory();

  if (user) {
    history.push("/");
  }

  return (
    <div>
      <p>Thanks for signing up! Please click the link in your email to confirm your email address.</p>
    </div>
  );
}

export default ConfirmEmailMessage;
