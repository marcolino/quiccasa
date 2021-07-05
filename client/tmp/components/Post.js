//import React from "react";
import { useParams } from "react-router";
 
const postsData = require("../posts/posts.json");
 
export default function Post() {
  const { slug } = useParams(),
    post = findPostBySlug(slug);
 
  return (
    <div className={'classes.post'}>
      <h1 className="title">{post.title}</h1>
      <content>{post.content}</content>
    </div>
  );
}
 
function findPostBySlug(slug) {
  return postsData.find(o => o.slug === slug);
}
