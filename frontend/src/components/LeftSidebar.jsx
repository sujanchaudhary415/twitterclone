import React, { useContext } from "react";
import { FaTwitter } from "react-icons/fa";
import { RiHome4Fill } from "react-icons/ri";
import { CiHashtag } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { CiCircleMore } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import profileImage from "../assets/profileImage.jpeg";
import { Link, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { UserContext } from './../../context/UserContext';

const LeftSidebar = () => {
  const {logoutUser}=useContext(UserContext);
  const location = useLocation(); // Get the current path
  return (
    <div className="flex flex-col justify-between h-screen py-2 border-r-1 border-gray-600 ">
      <div className="flex flex-col gap-8  ">
        <Link to='/'>
          <FaTwitter className="size-8" />
        </Link>
        <Link
          to="/"
          className={`flex items-center gap-4 ${location.pathname==='/'? "text-blue-400":"text-white"} cursor-pointer`}
        >
          <RiHome4Fill className="size-8" />
          <h2 className="font-bold">Home</h2>
        </Link>
        <div className="flex items-center gap-4 cursor-pointer">
          <CiHashtag className="size-8" />
          <h2 className="font-bold">Explore</h2>
        </div>

        <div className="flex items-center gap-4 cursor-pointer">
          <FaRegBell className="size-8" />
          <h2 className="font-bold">Notifications</h2>
        </div>

        <div className="flex items-center gap-4 cursor-pointer">
          <FaRegMessage className="size-8" />
          <h2 className="font-bold">Messages</h2>
        </div>

        <div className="flex items-center gap-4 cursor-pointer">
          <CiBookmark className="size-8" />
          <h2 className="font-bold">Bookmarks</h2>
        </div>

        <div className="flex items-center gap-4 cursor-pointer">
          <CiViewList className="size-8" />
          <h2 className="font-bold">Lists</h2>
        </div>

        <Link
          to="/myProfile"
          className={`flex items-center gap-4 ${location.pathname==='/myProfile'? "text-blue-400":"text-white"} cursor-pointer`}
        >
          <CiUser className="size-8" />
          <h2 className="font-bold">Profile</h2>
        </Link>

        <div className="flex items-center gap-4 cursor-pointer">
          <CiCircleMore className="size-8" />
          <h2 className="font-bold">More</h2>
        </div>

        <div className="flex items-center gap-4 cursor-pointer" onClick={logoutUser}>
          <CiLogout className="size-8" />
          <h2 className="font-bold">Logout</h2>
        </div>
        <button className="bg-blue-400 w-1/2 py-2 rounded-full cursor-pointer">
          Tweet
        </button>
      </div>
      <div className="flex items-center gap-2">
        <img src={profileImage} alt="" className="size-8 rounded-full" />
        <div className="flex flex-col ">
          <h2 className="font-bold">Sujan Chaudhary</h2>
          <h2 className="text-gray-500">@Sujan</h2>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
