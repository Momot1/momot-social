import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ChatElement from "./ChatElement";
import "../../css/container.css";

function Messages() {
  const user = useSelector((state) => state.users.user);
  const history = useHistory();

  console.log(user);

  if (!user) {
    return <div>Loading...</div>;
  }

  const chatElements = user.chats.map((chat) => <ChatElement key={chat.id} chat={chat} />);

  function handleNewMessageClick() {
    history.push("/mommot/messages/new");
  }

  return (
    <div className="div-container">
      <button onClick={handleNewMessageClick} className="btn btn-secondary">
        New Message
      </button>
      {chatElements}
    </div>
  );
}

export default Messages;
