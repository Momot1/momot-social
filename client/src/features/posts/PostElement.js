import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { postRemoved } from "./postSlicer";

function PostElement({ post }) {
  const history = useHistory();
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  function handleCommentClick() {
    history.push(`/posts/${post.id}`);
  }

  function handleLikeClick(e) {
    const likeBtn = e.currentTarget.children[0];
    if (likeBtn.classList.contains("bi-hand-thumbs-up")) {
      likeBtn.classList.remove("bi-hand-thumbs-up");
      likeBtn.classList.add("bi-hand-thumbs-up-fill");
    } else {
      likeBtn.classList.add("bi-hand-thumbs-up");
      likeBtn.classList.remove("bi-hand-thumbs-up-fill");
    }
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
