import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAdded } from "./postSlicer";
import "./css/newPost.css";

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

  console.log(formData.image);

  function onPostSubmit(e) {
    e.preventDefault();
    const image = e.target.children[2].children[0].files[0];

    // console.log(image);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("post", formData.post);
    data.append("image", image);
    console.log(data);
    // console.log(e.target.children[2].children[0].value);
    fetch("/posts", {
      method: "POST",
      body: data,
    })
      .then((resp) => resp.json())
      .then((post) => dispatch(postAdded(post)))
      .catch((error) => console.log(error));
  }

  return (
    <div id="new-post-container">
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
          <input type="file" name="image" accept="image/*" />
        </div>
        <button type="submit" className="btn btn-lg btn-secondary">
          Post
        </button>
      </form>
    </div>
  );
}

export default NewPost;
