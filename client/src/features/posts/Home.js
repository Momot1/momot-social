import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PostElement from "./PostElement";
import { useHistory } from "react-router-dom";
import "./css/home.css";
import "../../css/container.css";

function Home() {
  const user = useSelector((state) => state.users.user);
  const posts = useSelector((state) => state.posts);
  const history = useHistory();

  if (!posts.posts) {
    return <>Loading...</>;
  }

  const postElements = posts.posts.map((post) => (
    <div key={post.id}>
      <PostElement post={post} />
    </div>
  ));

  console.log(posts);

  function handleNewPostButtonClick() {
    if (user) {
      history.push("/posts/new");
    } else {
      history.push("/login");
    }
  }

  return (
    <div className="div-container">
      <div id="new-post-button">
        <button onClick={handleNewPostButtonClick} className="btn btn-lg btn-secondary">
          New Post
        </button>
      </div>

      {postElements}
    </div>
  );
}

export default Home;
