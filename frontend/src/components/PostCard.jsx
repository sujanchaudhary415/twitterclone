import React, { useContext, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { PostContext } from "./../../context/Post.Context";

const PostCard = ({ posts }) => {
  const { addComment } = useContext(PostContext);
  const [openComment, setOpenComment] = useState({}); // Store comment state per post
  const [postComments, setPostComments] = useState({}); // Store comments per post

  const toggleComment = (postId) => {
    setOpenComment((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Toggle only for clicked post
    }));
  };

  const handleCommentChange = (postId, value) => {
    setPostComments((prev) => ({
      ...prev,
      [postId]: value, // Store comment input per post
    }));
  };

  const handleSubmit = (e, postId) => {
    e.preventDefault();
    if (!postComments[postId]) return; // Prevent empty comments

    addComment(postId, postComments[postId]);
    console.log(`Comment added to post ${postId}:`, postComments[postId]);

    // Clear input after submitting
    setPostComments((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="px-4 py-4 flex gap-3 border-b border-gray-700"
          >
            {/* Profile Image */}
            <img
              src={post.createdBy.profilePic}
              alt="User"
              className="size-10 rounded-full"
            />

            {/* Post Content */}
            <div className="flex-1">
              {/* User Info */}
              <div className="flex gap-2 items-center">
                <h1 className="font-bold text-white">{post.createdBy.name}</h1>
                <p className="text-gray-400 text-sm">
                  • {new Date(post.createdAt).toLocaleTimeString()}
                </p>
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
                <div
                  className="text-gray-500 flex items-center gap-2 cursor-pointer hover:text-gray-300"
                  onClick={() => toggleComment(post._id)}
                >
                  <FaRegComment className="size-5" />
                  <p className="text-sm">{post.comments?.length || 0}</p>
                </div>
                <div className="text-gray-500 flex items-center gap-2 cursor-pointer hover:text-gray-300">
                  <FcLike className="size-5" />
                  <p className="text-sm">{post.likes || 0}</p>
                </div>
              </div>

              {/* Comment Section */}
              {openComment[post._id] && (
                <div className="mt-3 bg-gray-800 p-3 rounded-lg">
                  <h2 className="text-white text-sm font-semibold">
                    Comments:
                  </h2>
                  <div className="mt-2">
                    <p className="text-gray-300 text-sm mt-1">
                      <span className="font-bold">User:</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      No comments yet. Be the first to comment!
                    </p>
                  </div>

                  {/* Comment Input */}
                  <form
                    onSubmit={(e) => handleSubmit(e, post._id)}
                    className="mt-3 flex gap-2"
                  >
                    <input
                      value={postComments[post._id] || ""}
                      onChange={(e) =>
                        handleCommentChange(post._id, e.target.value)
                      }
                      type="text"
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 text-sm bg-gray-700 text-white rounded-md outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600"
                    >
                      Post
                    </button>
                  </form>
                </div>
              )}
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
