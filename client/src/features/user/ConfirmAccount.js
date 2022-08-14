import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ConfirmAccount() {
  const token = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.users.user);

  if (user) {
    history.push("/");
  } else {
    fetch(`/confirmemail/${token.confirm_token}`).then((resp) => {
      if (resp.ok) {
        resp.json().then(() => history.push("/login"));
      } else {
        resp.json().then((resp) => alert(resp.error));
      }
    });
  }

  return <div>ConfirmAccount</div>;
}

export default ConfirmAccount;
