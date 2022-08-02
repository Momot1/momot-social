import React from "react";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";

function UserFriends() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  if (!user) {
    return <div>Loading....</div>;
  }

  if (user.friends && user.friends.confirmed.length < 1 && user.friends.pending.length < 1) {
    return <div>No Friends</div>;
  }

  const friends = user.friends.confirmed;

  const pendingFriends = user.friends.pending;

  const friendElements = friends.map((friend) => <UserCard user={friend} key={friend.id} />);
  const pendingFriendElements = pendingFriends.map((friend) => (
    <div>
      {user.id === friend.sender_id ? (
        <div>
          <h4>{friend.friend.username}</h4>
          <button disabled>Request Sent</button>
          <button onClick={() => handleRemoveFriendClick(friend.friend.id)}>Retract Request</button>
        </div>
      ) : (
        <div>
          <h4>{friend.friend.username}</h4>
          <button onClick={() => handleConfirmFriendClick(friend.id)}>Confirm</button>
          <button onClick={() => handleRemoveFriendClick(friend.friend.id)}>Deny</button>
        </div>
      )}
    </div>
  ));

  function handleRemoveFriendClick(id) {
    fetch(`/users/removefriend/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((user) => {
        // console.log(user);
        dispatch({ type: "update chats", payload: user });
      });
  }

  function handleConfirmFriendClick(id) {
    fetch(`/users/confirmfriend/${id}`)
      .then((resp) => resp.json())
      .then((user) => {
        dispatch({ type: "update chats", payload: user });
      });
  }

  return (
    <div>
      <h4>My Friends</h4>
      {friendElements}
      <h4>Pending friendships</h4>
      {pendingFriendElements}
    </div>
  );
}

export default UserFriends;
