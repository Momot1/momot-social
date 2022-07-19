import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAdded } from "./postSlicer";

function NewPost() {
  const [formData, setFormData] = useState({ title: "", post: "" });
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  if (!user) {
    return <div>Loading...</div>;
  }

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onPostSubmit(e) {
    e.preventDefault();

    fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((post) => dispatch(postAdded(post)));
  }

  return (
    <div>
      <form onSubmit={onPostSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="title">
            Title
          </span>
          <input type="text" name="title" value={formData.title} onChange={updateFormData} className="form-control" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" aria-label="post">
            Post
          </span>
          <input type="text" name="post" value={formData.post} onChange={updateFormData} className="form-control" />
        </div>
        <button type="submit" className="btn btn-lg btn-secondary">
          Post
        </button>
      </form>
    </div>
  );
}

export default NewPost;
