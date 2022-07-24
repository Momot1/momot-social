import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentElement from "./CommentElement";

function PostPage() {
  const id = useParams();

  const user = useSelector((state) => state.users.user);

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`/posts/${id.id}`)
      .then((resp) => resp.json())
      .then(setPost);
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  const comments = post.comments.map((comment) => <CommentElement comment={comment} key={comment.id} />);

  function handleCommentSubmit(e) {
    e.preventDefault();
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: comment, user_id: user.id, post_id: post.id }),
    })
      .then((resp) => resp.json())
      .then((post) => {
        setPost(post);
        setComment("");
      });
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.post}</p>
      {comments}
      {user ? (
        <form onSubmit={handleCommentSubmit}>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button type="submit">Comment</button>
        </form>
      ) : null}
    </div>
  );
}

export default PostPage;
