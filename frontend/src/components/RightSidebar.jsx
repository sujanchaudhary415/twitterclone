import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { UserContext } from "./../../context/UserContext";

const RightSidebar = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { getUser, user, getLoggedInUser, loggedInUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
    getLoggedInUser();
  }, []);

  useEffect(() => {
    console.log("Fetched user data:", user);
    if (Array.isArray(user)&& loggedInUser) {
      const filteredUsers = user.filter((u)=>u._id !== loggedInUser._id);
      setUsers(filteredUsers.map((u) => ({ ...u, followed: false })));
    }
  }, [user]);

  const toggleFollow = (userId) => {
    setUsers(users.map((u) => (u._id === userId ? { ...u, followed: !u.followed } : u)));
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
              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-gray-400 text-sm">{u.email}</p>
              </div>
              <button
                className={`px-3 py-1 text-sm rounded-full ${
                  u.followed ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={() => toggleFollow(u._id)}
              >
                {u.followed ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RightSidebar;
