import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const user = useSelector((state) => state.users.user);

  if (!user) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>{user.username}</p>
      <Link to={`/${user.username}/change-password`}>Change Password</Link>
    </div>
  );
}

export default Profile;
