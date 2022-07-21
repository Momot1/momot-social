import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postRemoved } from "./postSlicer";

function PostElement({ post }) {
  const history = useHistory();
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

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

  function handleDislikeClick(e) {
    const dislikeBtn = e.currentTarget.children[0];
    if (e.currentTarget.children[0].classList.contains("bi-hand-thumbs-down")) {
      dislikeBtn.classList.remove("bi-hand-thumbs-down");
      dislikeBtn.classList.add("bi-hand-thumbs-down-fill");
    } else {
      dislikeBtn.classList.add("bi-hand-thumbs-down");
      dislikeBtn.classList.remove("bi-hand-thumbs-down-fill");
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
      <>
        <button onClick={handleLikeClick}>
          <i className="bi bi-hand-thumbs-up"></i>
        </button>
        <button onClick={handleDislikeClick}>
          <i className="bi bi-hand-thumbs-down"></i>
        </button>
      </>
    );
  }

  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.post}</p>
      {user ? userLoggedIn() : null}
      <button onClick={handleCommentClick}>
        <i className="bi bi-chat-square-text"></i>
      </button>
      {user && user.id === post.user_id ? (
        <button onClick={handleDeleteClick}>
          <i className="bi bi-trash"></i>
        </button>
      ) : null}
    </div>
  );
}

export default PostElement;
