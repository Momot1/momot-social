import React from "react";
import { useSelector } from "react-redux";

function Messages() {
  const user = useSelector((state) => state.users.user);

  console.log(user);

  return <div>Messages</div>;
}

export default Messages;
