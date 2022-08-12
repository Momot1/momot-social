import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CommentElement from "./CommentElement";
import PostElement from "./PostElement";
import { commentAdded, commentRemoved } from "./postSlicer";
import "./css/post.css";

function PostPage() {
  const id = useParams();

  const user = useSelector((state) => state.users.user);
  const post = useSelector((state) => state.posts.posts.find((post) => post.id == id.id));

  // const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  // const post = posts.find((post) => post.id == id.id);

  // console.log(testPost);

  // useEffect(() => {
  //   fetch(`/posts/${id.id}`)
  //     .then((resp) => resp.json())
  //     .then(setPost);
  // }, [posts]);

  if (!post) {
    return <div>Loading...</div>;
  }

  function removeComment(id) {
    const filteredComments = post.comments.filter((comment) => comment.id !== id);
    dispatch(commentRemoved(post, id));
    const comments_count = post.comments_count - 1;
    // setPost({ ...post, comments: filteredComments, comments_count: comments_count });
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
      .then((comment) => {
        // setPost(post);
        dispatch(commentAdded({ id: post.id, comment: comment }));
        setComment("");
      });
  }

  return (
    <div id="post-container">
      <PostElement post={post} />

      {comments.length > 0 ? comments : <p>Currently no comments, be the first to comment!</p>}
      {user ? (
        <form onSubmit={handleCommentSubmit} id="comment-form">
          <textarea id="comment-textbox" rows="4" placeholder="Comment here" value={comment} onChange={(e) => setComment(e.target.value)} /> <br />
          <button type="submit" className="btn btn btn-secondary w-100">
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
