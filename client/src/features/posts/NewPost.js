import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postAdded } from "./postSlicer";
import "./css/newPost.css";
import "../../css/container.css";

function NewPost() {
  const [formData, setFormData] = useState({ title: "", post: "" });
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user) {
    return <div>Loading...</div>;
  }

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onPostSubmit(e) {
    e.preventDefault();
    const image = e.target.children[2].children[0].children[0].files[0];

    const data = new FormData();
    data.append("title", formData.title);
    data.append("post", formData.post);
    data.append("image", image);

    fetch("/posts", {
      method: "POST",
      body: data,
    })
      .then((resp) => resp.json())
      .then((post) => {
        dispatch(postAdded(post));
        history.push(`/posts/${post.id}`);
      });
  }

  return (
    <div id="new-post-container" className="div-container">
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
        <div className="input-group mb-3">
          <label htmlFor="inputTag" id="picture-label" className="btn btn-secondary">
            Select image
            <input id="inputTag" type="file" name="image" accept="image/*" />
          </label>
        </div>
        <button type="submit" className="btn btn-secondary">
          Post
        </button>
      </form>
    </div>
  );
}

export default NewPost;
