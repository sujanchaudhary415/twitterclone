import React, { useContext, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import { PostContext } from "../../context/Post.Context";


const PostCard = ({ posts }) => {
  const { addComment,likePost } = useContext(PostContext);
  const [openComment, setOpenComment] = useState({});
  const [postComments, setPostComments] = useState({});
  const [likedPosts,setLikedPosts] = useState({});

  const toggleComment = (postId) => {
    setOpenComment((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId, value) => {
    setPostComments((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleSubmit = async (e, postId) => {
    e.preventDefault();
    if (!postComments[postId]) return;

    await addComment(postId, postComments[postId]); // Update UI immediately

    setPostComments((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  const handleLike = async (postId) => {
     await likePost(postId);
     setLikedPosts((prev) => ({
     ...prev,
      [postId]:!prev[postId],
    }));
  }
  

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
              src={post.createdBy?.profilePic || "/default-user.png"}
              alt="User"
              className="size-10 rounded-full"
            />

            {/* Post Content */}
            <div className="flex-1">
              <div className="flex gap-2 items-center">
                <h1 className="font-bold text-white">
                  {post.createdBy?.name || "Unknown"}
                </h1>
                <p className="text-gray-400 text-sm">
                  • {new Date(post.createdAt).toLocaleTimeString()}
                </p>
              </div>

              <p className="text-white mt-1">{post.caption}</p>

              {post.image && (
                <div className="mt-3">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full max-h-[500px] object-cover rounded-lg shadow-lg border border-gray-700"
                  />
                </div>
              )}

              <div className="flex items-center gap-6 mt-3">
                <div
                  className="text-gray-500 flex items-center gap-2 cursor-pointer hover:text-gray-300"
                  onClick={() => toggleComment(post._id)}
                >
                  <FaRegComment className="size-5" />
                  <p className="text-sm">{post.comments?.length || 0}</p>
                </div>
                <div onClick={()=>handleLike(post._id)} className="text-gray-500 flex items-center gap-2 cursor-pointer hover:text-gray-300">
                  {likedPosts[post._id]? (<AiTwotoneLike className="size-5"/>): (<AiOutlineLike className="size-5" /> )}
                  <p className="text-sm">{post.likes?.length || 0}</p>
                 
                </div>
              </div>

              {/* Comments Section */}
              {openComment[post._id] && (
                <div className="mt-3 bg-gray-800 p-3 rounded-lg">
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, index) => {
                      return (
                        <div
                          key={index}
                          className="mt-2 flex items-start gap-3"
                        >
                          {/* Comment Profile Picture */}
                          <img
                            src={
                              comment.createdBy?.profilePic ||
                              "/default-user.png"
                            }
                            alt="User"
                            className="size-8 rounded-full"
                          />

                          <div>
                            <p className="text-gray-300 text-sm">
                              <span className="font-bold">
                                {comment.createdBy?.name || "Anonymous"}:
                              </span>{" "}
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No comments yet. Be the first to comment!
                    </p>
                  )}

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
