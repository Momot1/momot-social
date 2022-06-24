import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.users.user);

  if (!user) {
    return (
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <p>{user.username}</p>
    </div>
  );
}

export default Profile;
