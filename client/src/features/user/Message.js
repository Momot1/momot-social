import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessageElement from "./MessageElement";
import "../../css/container.css";
import "./css/message.css";

function Message() {
  const user = useSelector((state) => state.users.user);
  const params = useParams();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  //   console.log(params);

  if (!user || !user.chats) {
    return <div>Loading...</div>;
  }

  console.log(user.chats);

  const chat = user.chats.find((chat) => {
    if (chat.users) {
      return chat.users.find((user) => user.username === params.otheruser);
    }
  });

  //   if (!chat) {
  //     return <div>Yo hold up</div>;
  //   }

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
    <div className="div-container message-container">
      <h4>To: @{params.otheruser}</h4>
      {messageElements}
      <form onSubmit={onChatSend}>
        <div className="input-group mb-3">
          <input value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" required />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Message;
