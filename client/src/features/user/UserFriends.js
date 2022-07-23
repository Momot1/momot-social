import React from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";

function UserFriends() {
  const friends = useSelector((state) => state.users.user.friends);

  const friendElements = friends.map((friend) => <UserCard user={friend} />);

  return <div>{friendElements}</div>;
}

export default UserFriends;
