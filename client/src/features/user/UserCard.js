import React from "react";

function UserCard({ user }) {
  console.log(user);

  return (
    <div>
      <h4>
        {user.first_name} {user.last_name}
      </h4>
      <p>@{user.username}</p>
      <button>Message</button>
    </div>
  );
}

export default UserCard;
