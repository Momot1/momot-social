import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

function NewMessage() {
  const user = useSelector((state) => state.users.user);

  //   console.log(user.friends.confirmed);

  const [search, setSearch] = useState("");

  if (!user) {
    return <div>Loading...</div>;
  }

  const filteredFriends = user.friends.confirmed.filter((friend) => friend.username.includes(search));

  const filteredFriendsElements = filteredFriends.map((friend) => <UserCard user={friend} />);

  return (
    <div>
      <form>
        <div>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </form>
      {filteredFriendsElements}
    </div>
  );
}

export default NewMessage;
