import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { CiCamera, CiLocationArrow1 } from "react-icons/ci";
import { MdDateRange } from "react-icons/md";
import PostCard from "./../components/PostCard";
import { Link } from "react-router-dom";
import { UserContext } from "./../../context/UserContext";
import { formatDate } from "./../../lib/formatDate";
import { PostContext } from "./../../context/Post.Context";

const ProfilePage = () => {
  const { getLoggedInUser, loggedInUser, updateProfile } =
    useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const { fetchPostByUserId, postData } = useContext(PostContext);

  useEffect(() => {
    fetchPostByUserId();
    getLoggedInUser();
  }, []);


  useEffect(() => {
    console.log(loggedInUser);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const image = reader.result;
      setSelectedImage(image);
      await updateProfile({ profilePic: image });
    };
  };

  return (
    <div className="border-r-1 h-screen border-gray-600 overflow-auto scrollbar-hide">
      <div className="flex items-center gap-8">
        <Link to="/">
          <FaArrowLeft className="size-6 text-blue-500" />
        </Link>
        <div className="flex flex-col">
          <h1 className="font-bold">{loggedInUser?.name}</h1>
          <p className="text-gray-600 text-sm">9 tweets</p>
        </div>
      </div>
      <div className="w-full relative">
        <img
          src="https://images.unsplash.com/photo-1515940175183-6798529cb860?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvdmVyJTIwcGhvdG98ZW58MHx8MHx8fDA%3D"
          alt=""
          className="w-full h-96 object-cover rounded"
        />
        <label className="absolute top-80 left-2" htmlFor="avatar upload">
          <img
            className="size-32 rounded-full"
            src={selectedImage || loggedInUser?.profilePic || "/avatar.png"}
            alt="Profile Picture"
          />
          <input
            type="file"
            id="avatar upload"
            onChange={handleImageUpload}
            className="hidden object-cover"
          />
          <CiCamera className="text-3xl absolute top-20 right-3 text-black bg-gray-100 rounded-full" />
        </label>
        <div className="flex justify-end mt-2 ">
          <button className="px-4 py-2 text-blue-400 border border-blue-400  rounded-full cursor-pointer">
            Edit Profile
          </button>
        </div>
        <div className="px-4">
          <h1 className="font-bold text-2xl mt-4">{loggedInUser?.name}</h1>
          <p className="text-gray-600 text-sm">{loggedInUser?.email}</p>
          <p>{loggedInUser?.proffession}</p>
          <div className="flex items-center gap-2 text-gray-500 mt-4 ">
            <div className="flex items-center gap-2">
              <CiLocationArrow1 className="size-6" />
              <p>{loggedInUser?.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <MdDateRange className="size-6" />
              <p>{formatDate(loggedInUser?.joinedAt)}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            <p className="font-bold">
              {loggedInUser?.following.length || 0} <span className="text-gray-600">Following</span>
            </p>
            <p className="font-bold">
              {loggedInUser?.followers.length || 0} <span className="text-gray-600">Followers</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-12 text-xl font-bold text-gray-500 mt-8 px-4 cursor-pointer">
          <p className="text-blue-500">Tweets</p>
          <p>Likes</p>
        </div>
        <hr className="w-full border-gray-600 mt-4" />
      </div>
      <PostCard posts={postData} />
    </div>
  );
};

export default ProfilePage;
