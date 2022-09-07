import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import "../../css/container.css";
import "./css/message.css";

function NewMessage() {
  const user = useSelector((state) => state.users.user);

  const [search, setSearch] = useState("");

  if (!user) {
    return <div>Loading...</div>;
  }

  function handleMessageSearch(e) {
    e.preventDefault();
  }

  const filteredFriends = user.friends.confirmed.filter((friend) => friend.username.includes(search));

  const filteredFriendsElements = filteredFriends.map((friend) => <UserCard user={friend} key={friend.id} />);

  return (
    <div className="div-container message-container">
      {user.friends.confirmed.length > 0 ? (
        <>
          <form onSubmit={handleMessageSearch}>
            <div className="input-group mb-3">
              <span className="input-group-text" aria-label="search">
                @
              </span>
              <input type="text" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </form>
          {filteredFriendsElements}
        </>
      ) : (
        <h4>Sorry, you have no friends.</h4>
      )}
    </div>
  );
}

export default NewMessage;
