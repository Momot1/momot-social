import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function UserCard({ user }) {
  const loggedUser = useSelector((state) => state.users.user);
  const history = useHistory();
  const dispatch = useDispatch();

  function handleMessageClick() {
    // console.log(loggedUser.chats.find((chat) => chat.users.find((resultUser) => resultUser.id === user.id)));

    if (loggedUser.chats.find((chat) => chat.users.find((resultUser) => resultUser.id === user.id))) {
      history.push(`/${user.username}/messages/to=${user.username}`);
    } else {
      fetch("/user_chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loggedUser_id: loggedUser.id, recipientUser: user.id }),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          dispatch({ type: "update chats", payload: resp });
          history.push(`/${resp.username}/messages/to=${user.username}`);
          //   console.log(resp);
        });
    }
  }

  function handleRemoveFriendClick() {
    fetch(`/users/removefriend/${user.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((user) => {
        // console.log(user);
        dispatch({ type: "update chats", payload: user });
      });
  }

  function handleAddFriendClick() {
    fetch("/users/addfriend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ friend_id: user.id, user_id: loggedUser.id }),
    })
      .then((resp) => resp.json())
      .then((user) => {
        dispatch({ type: "update chats", payload: user });
      });
  }

  return (
    <div>
      <h4>
        {user.first_name} {user.last_name}
      </h4>
      <p>@{user.username}</p>
      <button onClick={handleMessageClick}>Message</button>
      {loggedUser.friends.confirmed.find((friend) => friend.id === user.id) ? (
        <button onClick={handleRemoveFriendClick}>Remove Friend</button>
      ) : (
        <button onClick={handleAddFriendClick}>Add Friend</button>
      )}
    </div>
  );
}

export default UserCard;
