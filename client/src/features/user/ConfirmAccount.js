import React from "react";
import { useHistory, useParams } from "react-router-dom";

function ConfirmAccount() {
  const token = useParams();
  const history = useHistory();

  console.log(token);

  fetch(`/confirmemail/${token.confirm_token}`)
    .then((resp) => resp.json())
    .then((resp) => {
      history.push("/login");
    });

  return <div>ConfirmAccount</div>;
}

export default ConfirmAccount;
