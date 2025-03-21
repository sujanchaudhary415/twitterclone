import React, { useContext, useEffect, useState } from "react";
import { GiStarsStack } from "react-icons/gi";
import { CiImageOn } from "react-icons/ci";
import profileImage from "../assets/profileImage.jpeg";
import PostCard from "./PostCard";
import { PostContext } from "../../context/Post.Context.jsx";

const MainBar = () => {
  const [formData, setFormData] = useState({
    caption: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const { createPost, fetchPosts, postData } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
  }, []); // Empty dependency array ensures it runs only once



  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("caption", formData.caption);

    // Append image file if selected
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    // Call createPost function from context
    try {
      createPost(formDataToSend);
      setFormData({ caption: "" });
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="border-r border-gray-600 h-screen overflow-auto scrollbar-hide">
      {/** Header */}
      <div className="flex items-center justify-between border-b border-gray-600 py-3 px-4 bg-black">
        <h1 className="text-xl font-bold text-white">Home</h1>
        <GiStarsStack className="text-blue-400 size-7 cursor-pointer" />
      </div>

      {/** Post Input Section */}
      <div className="px-4 py-4 flex items-start gap-3">
        <img
          src={profileImage}
          alt="Profile"
          className="size-12 rounded-full object-cover"
        />
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <textarea
            value={formData.caption}
            onChange={(e) =>
              setFormData({ ...formData, caption: e.target.value })
            }
            placeholder="What's happening?"
            className="bg-transparent border-none outline-none w-full text-lg px-2 py-1 placeholder-gray-400 resize-none"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-full h-48 object-cover rounded-lg shadow-md"
            />
          )}
          <div className="flex items-center justify-between mt-3">
            <div>
              <label htmlFor="imageinput" className="cursor-pointer">
                <CiImageOn className="size-7 text-blue-400" />
              </label>
              <input
                accept="image/*"
                type="file"
                id="imageinput"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData({ ...formData, image: file });
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-200"
            >
              Tweet
            </button>
          </div>
        </form>
      </div>

      <hr className="border-gray-600 mt-2" />

      {/** Posts Section */}
      <PostCard posts={postData} />
    </div>
  );
};

export default MainBar;
