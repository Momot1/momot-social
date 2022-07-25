import React from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";

function UserFriends() {
  const user = useSelector((state) => state.users.user);

  if (!user) {
    return <div>Loading....</div>;
  }

  const friends = user.friends;

  const friendElements = friends.map((friend) => <UserCard friend={friend} key={friend.id} />);

  return <div>{friendElements}</div>;
}

export default UserFriends;
