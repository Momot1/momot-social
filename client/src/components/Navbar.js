import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./css/navbar.css";
import { searchedPost } from "../features/posts/postSlicer";
import { fetchPosts } from "../features/posts/postSlicer";

function Navbar() {
  const history = useHistory();
  const user = useSelector((state) => state.users.user);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const searchedPosts = useSelector((state) => state.posts.searchedPosts);

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
          <Link to={`/${user.username}/friends`} data-toggle="collapse" data-target="#navbarToggleExternalContent" className="dropdown-item">
            My Friends
          </Link>
          <br />
          <Link to={`/${user.username}/messages`} data-toggle="collapse" data-target="#navbarToggleExternalContent" className="dropdown-item">
            Messages
          </Link>
          <br />
          <Link to={`/${user.username}/profile`} data-toggle="collapse" data-target="#navbarToggleExternalContent" className="dropdown-item">
            My Profile
          </Link>
          <br />
          <Link to="/logout" data-toggle="collapse" data-target="#navbarToggleExternalContent" className="dropdown-item">
            Logout
          </Link>
        </div>
      </div>
    );
  }

  function handleSearch(e) {
    e.preventDefault();
    if (search !== "") {
      fetch(`/${e.target.children[2].value}/search/search=${search}`)
        .then((resp) => resp.json())
        .then((result) => {
          // e.target.children[2].value === "posts" ? dispatch(searchedPost(result)) : history.push(`/users/search=${search}`);

          if (e.target.children[2].value === "posts") {
            history.push(`/search-posts/search=${search}`);
            dispatch(searchedPost(result));
            setSearch("");
            // history.push("/");
          } else {
            history.push(`/users/search=${search}`);
            setSearch("");
            dispatch({ type: "search", payload: result });
          }

          // dispatch(searchedPost(result));
        });
    }
  }

  function searchBar() {
    return (
      <form onSubmit={handleSearch} id="search-form">
        <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
        <button type="submit">
          <i className="bi bi-search"></i>
        </button>
        <select>
          <option value="posts">Posts</option>
          <option value="users">Users</option>
        </select>
      </form>
    );
  }

  function navLinks() {
    return (
      <>
        <NavLink
          exact
          to="/"
          className="nav-link btn btn-secondary btn-lg me-4 nav-link"
          data-toggle="collapse"
          data-target="#navbarToggleExternalContent"
        >
          Home
        </NavLink>
        {user ? (
          loggedInDropdown()
        ) : (
          <NavLink
            to="/login"
            className="nav-link btn btn-secondary btn-lg me-4 nav-link"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
          >
            Login
          </NavLink>
        )}
      </>
    );
  }

  return (
    <div>
      <div className="nav" id="nav-bar">
        <div>{searchBar()}</div>
        {navLinks()}
      </div>

      <nav id="mobile-nav">
        <div>{searchBar()}</div>
        <nav
          className="navbar-dark bg-dark"
          style={{
            width: "min-content",
            position: "relative",
            left: "calc(100% - 80px)",
          }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span id="menu-button" className="navbar-toggler-icon"></span>
          </button>
        </nav>
        <div className="collapse tests" id="navbarToggleExternalContent">
          <div className="bg-dark p-4  tests">
            <div className="d-flex flex-column navbar">{navLinks()}</div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
