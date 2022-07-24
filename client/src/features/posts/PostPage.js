import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentElement from "./CommentElement";

function PostPage() {
  const id = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/posts/${id.id}`)
      .then((resp) => resp.json())
      .then(setPost);
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  console.log(post.comments);

  const comments = post.comments.map((comment) => <CommentElement comment={comment} key={comment.id} />);

  // if (post) {
  //   comments = post.comments.map((comment) => <CommentElement comment={comment} key={comment.id} />);
  // }

  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.post}</p>
      {comments}
    </div>
  );
}

export default PostPage;
