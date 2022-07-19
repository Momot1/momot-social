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
          <Link to={`/${user.username}/profile`}>My Profile</Link>
          <br />
          <Link to="/logout">Logout</Link>
        </div>
      </div>
    );
  }

  function searchBar() {
    return (
      <form>
        <input></input>
        <button type="submit">
          <i class="bi bi-search"></i>
        </button>
      </form>
    );
  }

  return (
    <div className="nav" id="nav-bar">
      <div>{searchBar()}</div>
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
