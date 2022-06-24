import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./css/navbar.css";

function Navbar() {
  const user = useSelector((state) => state.users.user);

  function loggedInDropdown() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-lg btn-secondary dropdown-toggle"
          id="nav-bar-dropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          type="button"
        >
          Hello, {user.first_name}
        </button>
        <div className="dropdown-menu" aria-describedby="nav-bar-dropdown">
          <Link to="/logout">Logout</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="nav" id="nav-bar">
      <NavLink exact to="/" className="nav-link btn btn-secondary btn-lg me-4 nav-link">
        Home
      </NavLink>
      {user ? (
        loggedInDropdown()
      ) : (
        <NavLink to="/login" className="nav-link btn btn-secondary btn-lg me-4 nav-link">
          Login
        </NavLink>
      )}
    </div>
  );
}

export default Navbar;
