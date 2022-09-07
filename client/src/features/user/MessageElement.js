import React from "react";
import { useSelector } from "react-redux";
import "./css/message.css";

function MessageElement({ message }) {
  const user = useSelector((state) => state.users.user);

  return (
    <div className="single-message">
      <p className={user.id === message.user_id ? "blue" : "gray"}>
        {message.created_at}
        <br />
        {message.message}
      </p>
    </div>
  );
}

export default MessageElement;
