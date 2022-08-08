import React from "react";
import { useSelector } from "react-redux";
import "./css/comment.css";

function CommentElement({ comment, removeComment, ownerId }) {
  const user = useSelector((state) => state.users.user);

  function handleCommentDelete() {
    fetch(`/comments/${comment.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        removeComment(comment.id);
      });
  }

  console.log(comment);

  return (
    <div>
      <h5 className="comment-title">@{comment.username} -</h5>
      <p className="comment-body">{comment.comment}</p>
      {user && (comment.username === user.username || user.is_admin || user.id === ownerId) ? (
        <button onClick={handleCommentDelete} className="btn btn-sm btn-secondary">
          <i className="bi bi-trash"></i>
        </button>
      ) : null}
    </div>
  );
}

export default CommentElement;
