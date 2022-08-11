import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostElement from "./PostElement";
import "./css/home.css";

function UserPosts() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  console.log(username);

  useEffect(() => {
    fetch(`/users/posts/${username}`)
      .then((resp) => resp.json())
      .then(setPosts);
  }, []);

  const postElements = posts.map((post) => <PostElement post={post} key={post.id} />);

  return <div className="home-container">{postElements}</div>;
}

export default UserPosts;
