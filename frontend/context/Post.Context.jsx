import { createContext, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postData, setPostData] = useState([]);

  const createPost = async (formData) => {
    try {
      const res = await axiosInstance.post("/posts/create", formData);
      toast.success("Post created successfully");
      setPostData([...postData, res.data]);
    } catch (error) {
      toast.error("Failed to create post");
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts/get");
      setPostData(res.data);
    } catch (error) {
      toast.error("Failed to fetch posts");
      console.log(error);
    }
  };

  const fetchPostByUserId = async () => {
    try {
      const res = await axiosInstance.get(`/posts/getByUserId`);
      setPostData(res.data);
    } catch (error) {
      toast.error("Failed to fetch posts by user id");
      console.log(error);
    }
  };

  const addComment=async(postId,commentText)=>{
    try {
      const res = await axiosInstance.post(`/posts/addComment`, { postId, comment: commentText });
      toast.success("Comment added successfully");
      setPostData(prevState=>prevState.map(post=>post._id===postId? {...post, comments:[...post.comments, res.data]}:post))

    } catch (error) {
       toast.error("Failed to add comment");
      console.log(error);
    }
  }

  return (
    <PostContext.Provider
      value={{ createPost, postData, fetchPosts, fetchPostByUserId,addComment}}
    >
      {children}
    </PostContext.Provider>
  );
};
