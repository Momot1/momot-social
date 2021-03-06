import React from "react";
import { useSelector } from "react-redux";
import "./css/message.css";

function MessageElement({ message }) {
  const user = useSelector((state) => state.users.user);

  return (
    <div>
      <p className={user.id === message.user_id ? "blue" : "green"}>
        {message.created_at}- {message.message}
      </p>
    </div>
  );
}

export default MessageElement;
