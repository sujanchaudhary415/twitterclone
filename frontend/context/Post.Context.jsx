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

   const fetchPosts=async()=>{
    try {
      const res = await axiosInstance.get("/posts/get");
      setPostData(res.data);
    } catch (error) {
      toast.error("Failed to fetch posts");
      console.log(error);
    }
  }

  return <PostContext.Provider value={{createPost,postData,fetchPosts}}>{children}</PostContext.Provider>;
};
