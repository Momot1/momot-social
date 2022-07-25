import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MessageElement from "./MessageElement";

function Message() {
  const user = useSelector((state) => state.users.user);
  const params = useParams();

  //   console.log(params);

  const chat = user.chats.find((chat) => chat.users.find((user) => user.username === params.otheruser));

  console.log(chat);

  const messageElements = chat.messages.map((message) => <MessageElement key={message.id} message={message} />);

  return <div>{messageElements}</div>;
}

export default Message;
