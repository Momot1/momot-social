import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostElement from "./PostElement";

function SearchedPosts() {
  const params = useParams();

  const searchedPosts = useSelector((state) => state.posts.searchedPosts);

  const postElements = searchedPosts.map((post) => <PostElement post={post} key={post.id} />);

  if (postElements.length < 1) {
    return <div>There are no posts matching the search of {params.search}</div>;
  }

  return <div>{postElements}</div>;
}

export default SearchedPosts;
