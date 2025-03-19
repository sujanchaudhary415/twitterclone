import React from "react";
import profileImage from "../assets/profileImage.jpeg";
import postImage from "../assets/postImage.jpg";
import { FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
const PostCard = () => {
  return (
    <div className="px-4 py-2 flex gap-2">
      <img src={profileImage} alt="" className="size-8 rounded-full" />
      <div>
        <div className="flex gap-2">
          <h1 className="font-bold">User Name</h1>
          <p className="text-gray-400">@username</p>
          <p className="text-gray-400"> . 23s</p>
        </div>
        <div>
          <p>This is the caption section</p>
          <img src={postImage} alt="" className="w-4xl rounded  " />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="text-gray-500 flex">
            <FaRegComment className="size-6 cursor-pointer" />
            <p>12</p>
          </div>
          <div className="text-gray-500 flex">
            <FcLike className="size-6 cursor-pointer" />
            <p>2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
