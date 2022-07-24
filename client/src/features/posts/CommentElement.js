import React from "react";
import { useSelector } from "react-redux";

function CommentElement({ comment }) {
  const username = useSelector((state) => state.users.user.username);

  return (
    <div>
      <h5>{comment.username} -</h5>
      <p>{comment.comment}</p>
      {comment.username === username ? (
        <button>
          <i className="bi bi-trash"></i>
        </button>
      ) : null}
    </div>
  );
}

export default CommentElement;
