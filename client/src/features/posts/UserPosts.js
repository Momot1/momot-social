import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostElement from "./PostElement";
import "./css/home.css";

function UserPosts() {
  const { username } = useParams();

  const posts = useSelector((state) => state.posts.posts.filter((post) => post.username === username));

  const postElements = posts.map((post) => <PostElement post={post} key={post.id} />);

  return (
    <div className="home-container">
      <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>@{username}'s posts</h2>
      {postElements}
    </div>
  );
}

export default UserPosts;
