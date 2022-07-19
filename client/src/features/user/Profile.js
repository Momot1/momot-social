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
      <h1>
        Profile for {user.first_name} {user.last_name}
      </h1>
      <p>Username- {user.username}</p>
      <p>Email Address- {user.email}</p>
      {user.birthday ? <p>Birthday- {user.birthday}</p> : <p>Add your birthday to your profile</p>}
      <p>Account Type- {user.is_admin ? "Administrator" : "Member"}</p>
      <p>
        <Link to={`/${user.username}/change-password`}>Change Password</Link>
      </p>
      <p>
        <Link to={`/${user.username}/friends`}>My Friends</Link>
      </p>
    </div>
  );
}

export default Profile;
