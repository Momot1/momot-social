import React from "react";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import "./css/userFriends.css";

function UserFriends() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  if (!user) {
    return <div>Loading....</div>;
  }

  if (user.friends && user.friends.confirmed.length < 1 && user.friends.pending.length < 1) {
    return (
      <div className="div-container">
        <h4>You currently have no friends.</h4>
      </div>
    );
  }

  const friends = user.friends.confirmed;

  const pendingFriends = user.friends.pending;

  const friendElements = friends.map((friend) => <UserCard user={friend} key={friend.id} />);
  const pendingFriendElements = pendingFriends.map((friend) => (
    <div key={friend.id}>
      {user.id === friend.sender_id ? (
        <div>
          <h4>{friend.friend.username}</h4>
          <button disabled className="btn btn-secondary">
            Request Sent
          </button>
          <button onClick={() => handleRemoveFriendClick(friend.friend.id)} className="btn btn-secondary">
            Retract Request
          </button>
        </div>
      ) : (
        <div>
          <h4>{friend.friend.username}</h4>
          <button onClick={() => handleConfirmFriendClick(friend.id)} className="btn btn-secondary">
            Confirm
          </button>
          <button onClick={() => handleRemoveFriendClick(friend.friend.id)} className="btn btn-secondary">
            Deny
          </button>
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
        dispatch({ type: "update user", payload: user });
      });
  }

  function handleConfirmFriendClick(id) {
    fetch(`/users/confirmfriend/${id}`)
      .then((resp) => resp.json())
      .then((user) => {
        dispatch({ type: "update user", payload: user });
      });
  }

  return (
    <div id="friends-container">
      <h4>My Friends</h4>
      {friendElements}
      {friendElements.length === 0 ? <p>Sorry, you have no friends</p> : null}
      <h4>Pending friendships</h4>
      {pendingFriendElements}
      {pendingFriendElements.length === 0 ? <p>No current pending friendships</p> : null}
    </div>
  );
}

export default UserFriends;
