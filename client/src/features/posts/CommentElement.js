import React from "react";
import { useSelector } from "react-redux";

function CommentElement({ comment, removeComment }) {
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

  return (
    <div>
      <h5>@{comment.username} -</h5>
      <p>{comment.comment}</p>
      {(user && comment.username === user.username) || user.is_admin ? (
        <button onClick={handleCommentDelete}>
          <i className="bi bi-trash"></i>
        </button>
      ) : null}
    </div>
  );
}

export default CommentElement;
