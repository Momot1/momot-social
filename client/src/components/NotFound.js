import React from "react";
import { Link } from "react-router-dom";
import "./css/notfound.css";

function NotFound() {
  return (
    <div id="not-found-container">
      <h1>Sorry, the page you are looking for does not exist</h1>
      <p>
        Feel free to go back to the <Link to="/">homepage</Link>
      </p>
    </div>
  );
}

export default NotFound;
