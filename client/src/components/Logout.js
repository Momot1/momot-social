import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();

  fetch("/logout", { method: "DELETE" })
    .then((resp) => resp.json())
    .then(() => {
      dispatch({ type: "logout" });
      history.push("/");
    });

  return <></>;
}

export default Logout;
