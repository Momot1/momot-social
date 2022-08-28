import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import "../../css/container.css";

function SearchedUsers() {
  const users = useSelector((state) => state.users.searchedUsers);
  const params = useParams();

  //   console.log(users);

  const userElements = users.map((user) => <UserCard key={user.id} user={user} />);

  if (userElements.length < 1) {
    return <div>No user results found for {params.search}</div>;
  }

  return <div className="div-container">{userElements}</div>;
}

export default SearchedUsers;
