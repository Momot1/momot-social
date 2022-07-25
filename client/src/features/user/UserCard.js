import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function UserCard({ friend }) {
  const user = useSelector((state) => state.users.user);
  const history = useHistory();
  console.log(user);

  function handleMessageClick() {
    console.log(friend);

    if (user.chats.find((chat) => chat.users.find((user) => user.id === friend.id))) {
      history.push(`/${user.username}/messages/to=${friend.username}`);
    } else {
    }
  }

  return (
    <div>
      <h4>
        {friend.first_name} {friend.last_name}
      </h4>
      <p>@{friend.username}</p>
      <button onClick={handleMessageClick}>Message</button>
    </div>
  );
}

export default UserCard;
