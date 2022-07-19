import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const id = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`/posts/${id.id}`)
      .then((resp) => resp.json())
      .then(setPost);
  }, []);

  console.log(post);

  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.post}</p>
    </div>
  );
}

export default PostPage;
