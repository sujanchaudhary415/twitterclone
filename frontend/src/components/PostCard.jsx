import React from "react";
import { FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const PostCard = ({ posts }) => {
  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="px-4 py-4 flex gap-3 border-b border-gray-700">
            {/* Profile Image */}
            <img src={post.createdBy.profilePic} alt="User" className="size-10 rounded-full" />

            {/* Post Content */}
            <div className="flex-1">
              {/* User Info */}
              <div className="flex gap-2 items-center">
                <h1 className="font-bold text-white">{post.createdBy.name}</h1>
                <p className="text-gray-400 text-sm">• {new Date(post.createdAt).toLocaleTimeString()}</p>
              </div>

              {/* Caption */}
              <p className="text-white mt-1">{post.caption}</p>

              {/* Post Image */}
              {post.image && (
                <div className="mt-3">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full max-h-[500px] object-cover rounded-lg shadow-lg border border-gray-700"
                  />
                </div>
              )}

              {/* Like & Comment Buttons */}
              <div className="flex items-center gap-6 mt-3">
                <div className="text-gray-500 flex items-center gap-2 cursor-pointer hover:text-gray-300">
                  <FaRegComment className="size-5" />
                  <p className="text-sm">{post.comments?.length || 0}</p>
                </div>
                <div className="text-gray-500 flex items-center gap-2 cursor-pointer hover:text-gray-300">
                  <FcLike className="size-5" />
                  <p className="text-sm">{post.likes || 0}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center mt-4">No posts available</p>
      )}
    </div>
  );
};

export default PostCard;
