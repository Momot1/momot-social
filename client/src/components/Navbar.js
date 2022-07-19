import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./css/navbar.css";
import { searchedPost } from "../features/posts/postSlicer";
import { fetchPosts } from "../features/posts/postSlicer";

function Navbar() {
  const user = useSelector((state) => state.users.user);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

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

  function handleSearch(e) {
    e.preventDefault();
    if (search !== "") {
      fetch(`/posts/search/search=${search}`)
        .then((resp) => resp.json())
        .then((posts) => dispatch(searchedPost(posts)));
    } else {
      dispatch(fetchPosts());
    }
  }

  function searchBar() {
    return (
      <form onSubmit={handleSearch}>
        <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
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
