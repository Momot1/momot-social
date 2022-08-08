import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentElement from "./CommentElement";
import PostElement from "./PostElement";
import "./css/post.css";

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

  function removeComment(id) {
    const filteredComments = post.comments.filter((comment) => comment.id !== id);
    setPost({ ...post, comments: filteredComments });
  }

  const comments = post.comments.map((comment) => (
    <CommentElement comment={comment} key={comment.id} removeComment={removeComment} ownerId={post.user_id} />
  ));

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
    <div id="post-container">
      <PostElement post={post} />

      {comments.length > 0 ? comments : <p>Currently no comments, be the first to comment!</p>}
      {user ? (
        <form onSubmit={handleCommentSubmit}>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button type="submit" className="btn btn-sm btn-secondary">
            Comment
          </button>
        </form>
      ) : (
        <p>
          Please <Link to="/login">login</Link> to comment
        </p>
      )}
    </div>
  );
}

export default PostPage;
