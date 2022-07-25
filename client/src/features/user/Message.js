import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessageElement from "./MessageElement";

function Message() {
  const user = useSelector((state) => state.users.user);
  const params = useParams();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  //   console.log(params);

  if (!user) {
    return <div>Loading...</div>;
  }

  const chat = user.chats.find((chat) => chat.users.find((user) => user.username === params.otheruser));

  const messageElements = chat.messages.map((message) => <MessageElement key={message.id} message={message} />);

  function onChatSend(e) {
    e.preventDefault();

    fetch("/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message, chat_id: chat.id }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        dispatch({ type: "update chats", payload: resp });
        setMessage("");
      });
  }

  return (
    <div>
      {messageElements}
      <form onSubmit={onChatSend}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Message;
