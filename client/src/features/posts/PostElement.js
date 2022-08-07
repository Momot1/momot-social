import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { postRemoved } from "./postSlicer";
import "./css/home.css";

function PostElement({ post }) {
  const history = useHistory();
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(checkIfLiked);

  function handleCommentClick() {
    history.push(`/posts/${post.id}`);
  }

  function checkIfLiked() {
    if (user && user.likes.find((like) => like.post_id === post.id)) {
      return true;
    } else {
      return false;
    }
  }

  if (!isLiked && user && user.likes.find((like) => like.post_id === post.id)) {
    setIsLiked(true);
  }

  function handleLikeClick() {
    if (!isLiked) {
      fetch("/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: post.id }),
      })
        .then((resp) => resp.json())
        .then((user) => {
          dispatch({ type: "update chats", payload: user });
          console.log(user);
          setIsLiked(true);
        });
    } else {
      const like = user.likes.find((like) => post.id === like.post_id);
      fetch(`/likes/${like.id}`, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then((user) => {
          dispatch({ type: "update chats", payload: user });
          setIsLiked(false);
        });
    }

    // setIsLiked(!isLiked);
  }

  function handleDeleteClick() {
    fetch(`/posts/${post.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        dispatch(postRemoved(post));
      });
  }

  function userLoggedIn() {
    return (
      <button onClick={handleLikeClick}>
        <i className={isLiked ? "bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}></i>
      </button>
    );
  }

  return (
    <div>
      <Link to={`/${post.username}/posts`}>{post.username}</Link>
      <img src={post.image_url} alt={post.title} className="post-image" />
      <h4>{post.title}</h4>
      <p>{post.post}</p>
      {user ? userLoggedIn() : null}
      <button onClick={handleCommentClick}>
        <i className="bi bi-chat-square-text"></i>
      </button>
      {user && (user.id === post.user_id || user.is_admin) ? (
        <button onClick={handleDeleteClick}>
          <i className="bi bi-trash"></i>
        </button>
      ) : null}
    </div>
  );
}

export default PostElement;
