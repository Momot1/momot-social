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
          <Link to={`/${user.username}/friends`}>My Friends</Link>
          <br />
          <Link to={`/${user.username}/messages`}>Messages</Link>
          <br />
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
      <form onSubmit={handleSearch}>
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
