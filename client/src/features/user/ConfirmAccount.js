import React from "react";
import { useHistory, useParams } from "react-router-dom";

function ConfirmAccount() {
  const token = useParams();
  const history = useHistory();

  console.log(token);

  // fetch(`/confirmemail/${token.confirm_token}`).then((resp) => {
  //   if (resp.ok) {
  //     resp.json().then(() => history.push("/login"));
  //   } else {
  //     resp.json().then((resp) => alert(resp.error));
  //   }
  // });

  fetch(`/confirmemail/${token.confirm_token}`)
    .then((resp) => resp.json())
    .then(console.log);

  return <div>ConfirmAccount</div>;
}

export default ConfirmAccount;
