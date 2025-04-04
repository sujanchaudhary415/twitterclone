import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { UserContext } from "./../../context/UserContext";
import Chat from "./Chat"; // Import Chat component

const RightSidebar = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user for chat

  const { getUser, user, getLoggedInUser, loggedInUser, follow } = useContext(UserContext);

  useEffect(() => {
    getUser();
    getLoggedInUser();
  }, []);

  useEffect(() => {
    if (Array.isArray(user) && loggedInUser) {
      const filteredUsers = user
        .filter((u) => u._id !== loggedInUser._id)
        .map((u) => ({
          ...u,
          followed: loggedInUser.following?.includes(u._id) || false,
        }));
      setUsers(filteredUsers);
    }
  }, [user, loggedInUser]);

  const toggleFollow = async (userId) => {
    try {
      await follow(userId);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === userId ? { ...u, followed: !u.followed } : u
        )
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="w-full lg:w-[300px] p-4 rounded-xl text-white shadow-lg">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 text-sm bg-gray-800 rounded-full outline-none text-white"
        />
        <FaSearch className="absolute right-3 top-3 text-gray-400" />
      </div>

      {/* Users List */}
      <h2 className="text-lg font-semibold mb-2">Who to Follow</h2>
      <div className="space-y-3">
        {users
          .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
          .map((u) => (
            <div
              key={u._id}
              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg cursor-pointer"
              onClick={() => setSelectedUser(u)} // Open chat when clicked
            >
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-gray-400 text-sm">{u.email}</p>
              </div>
              <button
                className={`px-3 py-1 text-sm rounded-full transition ${
                  u.followed
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent chat from opening when following
                  toggleFollow(u._id);
                }}
              >
                {u.followed ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
      </div>

      {/* Chat Box */}
      {selectedUser && (
        <Chat senderId={loggedInUser._id} receiverId={selectedUser._id} receiverName={selectedUser.name} closeChat={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default RightSidebar;
