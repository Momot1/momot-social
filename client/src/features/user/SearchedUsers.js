import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

function SearchedUsers() {
  const users = useSelector((state) => state.users.searchedUsers);

  //   console.log(users);

  const userElements = users.map((user) => <UserCard key={user.id} user={user} />);

  return <div>{userElements}</div>;
}

export default SearchedUsers;
