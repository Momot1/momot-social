import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./css/profile.css";

function Profile() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  function handleAccountDelete(e) {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(`/users/${user.id}`, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then(() => {
          window.location.reload();
          history.push("/");
          dispatch({ type: "logout" });
        });
    }
  }

  return (
    <div id="profile-container">
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
      <button onClick={handleAccountDelete} className="btn btn-secondary">
        Delete Account
      </button>
    </div>
  );
}

export default Profile;
