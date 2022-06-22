import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.users.user);

  return (
    <div>
      <Link to="/">Home</Link>
      {user ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
      {/* <Link to="/login">Login</Link> */}
      {user ? <p>{user.username}</p> : <p>fdgdfhd</p>}
    </div>
  );
}

export default Navbar;
