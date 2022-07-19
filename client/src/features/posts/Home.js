import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PostElement from "./PostElement";
import { useHistory } from "react-router-dom";

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

  function handleNewPostButtonClick() {
    if (user) {
      history.push("/posts/new");
    } else {
      history.push("/login");
    }
  }

  return (
    <div>
      <button onClick={handleNewPostButtonClick}>New Post</button>
      {postElements}
    </div>
  );
}

export default Home;
