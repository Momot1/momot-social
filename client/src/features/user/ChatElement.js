import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ChatElement({ chat }) {
  const user = useSelector((state) => state.users.user);
  //   const [otherUser, setOtherUser] = useState(null);

  const lastMessage = chat.messages[chat.messages.length - 1].message;
  console.log(chat);
  console.log(chat.messages[chat.messages.length - 1].message);

  //   useEffect(() => {
  //     setOtherUser(chat.users.filter((otherUser) => otherUser.id !== user.id));
  //   }, []);
  const otherUser = chat.users.filter((otherUser) => otherUser.id !== user.id);

  if (!otherUser || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to={`/${user.username}/messages/to=${otherUser[0].username}`}>
        <h4>
          {otherUser[0].first_name} {otherUser[0].last_name}
        </h4>
      </Link>

      <p>{lastMessage}</p>
    </div>
  );
}

export default ChatElement;
