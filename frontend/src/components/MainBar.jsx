import React from "react";
import { GiStarsStack } from "react-icons/gi";
import { CiImageOn } from "react-icons/ci";
import profileImage from "../assets/profileImage.jpeg";
import PostCard from './PostCard';
const MainBar = () => {
  return (
    <div className="border-r-1 border-gray-600 h-screen">
      <div className="flex items-center justify-between border-b-1 border-gray-600 py-2 ">
        <h1 className="px-4 text-xl font-bold">Home</h1>
        <GiStarsStack className="text-blue-400 size-7 mr-4" />
      </div>

      {/**post section */}
      <div className="px-4  flex items-center gap-2">
        <img src={profileImage} alt="" className="size-12 rounded-full" />
        <form className="w-full flex flex-col items-center">
          <input
            type="text"
            placeholder="What's happening?"
            className="bg-transparent border-none outline-none w-full text-lg px-2 py-1 rounded-full placeholder:text-gray-400"
          />
          <div className="flex items-center justify-between w-full">
            <div>
              <label htmlFor="imageinput">
                <CiImageOn className="size-7 text-blue-400" />
              </label>
              <input type="file" id="imageinput" className="hidden" />
            </div>
            <button className="bg-blue-400 w-40 py-2 rounded-full cursor-pointer">
              Tweet
            </button>
          </div>
        </form>
      </div>
      <hr className="w-full border-gray-600 mt-4" />
      <PostCard/>
    </div>
  );
};

export default MainBar;
