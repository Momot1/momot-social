import React from "react";
import { useSelector } from "react-redux";
import ChatElement from "./ChatElement";

function Messages() {
  const user = useSelector((state) => state.users.user);

  console.log(user);

  if (!user) {
    return <div>Loading...</div>;
  }

  const chatElements = user.chats.map((chat) => <ChatElement key={chat.id} chat={chat} />);

  return <div>{chatElements}</div>;
}

export default Messages;
