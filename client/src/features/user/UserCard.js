import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function UserCard({ user }) {
  const loggedUser = useSelector((state) => state.users.user);
  const history = useHistory();

  function handleMessageClick() {
    // console.log(loggedUser.chats.find((chat) => chat.users.find((resultUser) => resultUser.id === user.id)));

    if (loggedUser.chats.find((chat) => chat.users.find((resultUser) => resultUser.id === user.id))) {
      history.push(`/${user.username}/messages/to=${user.username}`);
    } else {
      console.log("yo");
    }
  }

  return (
    <div>
      <h4>
        {user.first_name} {user.last_name}
      </h4>
      <p>@{user.username}</p>
      <button onClick={handleMessageClick}>Message</button>
      {loggedUser.friends.find((friend) => friend.id === user.id) ? <button>Remove Friend</button> : <button>Add Friend</button>}
    </div>
  );
}

export default UserCard;
