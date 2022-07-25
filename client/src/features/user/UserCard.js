import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function UserCard({ user }) {
  const loggedUser = useSelector((state) => state.users.user);
  const history = useHistory();

  function handleMessageClick() {
    if (loggedUser.chats.find((chat) => chat.users.find((user) => user.id === loggedUser.id))) {
      history.push(`/${user.username}/messages/to=${user.username}`);
    } else {
    }
  }

  return (
    <div>
      <h4>
        {user.first_name} {user.last_name}
      </h4>
      <p>@{user.username}</p>
      <button onClick={handleMessageClick}>Message</button>
    </div>
  );
}

export default UserCard;
