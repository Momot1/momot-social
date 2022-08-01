import React from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";

function UserFriends() {
  const user = useSelector((state) => state.users.user);

  if (!user) {
    return <div>Loading....</div>;
  }

  if (user.friends && user.friends.confirmed.length < 1) {
    return <div>No Friends</div>;
  }

  const friends = user.friends.confirmed;

  const pendingFriends = user.friends.pending;

  const friendElements = friends.map((friend) => <UserCard user={friend} key={friend.id} />);
  const pendingFriendElements = friends.map((friend) => {});

  return (
    <div>
      <h4>My Friends</h4>
      {friendElements}
      <h4>Pending friendships</h4>
    </div>
  );
}

export default UserFriends;
