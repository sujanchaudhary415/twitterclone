import React, { useContext, useState } from "react";
import twitterLogo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const loginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const {loginUser}=useContext(UserContext);

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(formData);
    setFormData({ email: "", password: "" });
  }
  return (
    <div className="h-screen flex justify-center items-center  ">
      {/* twitter Logo */}
      <div className=" flex items-center justify-center">
        <img src={twitterLogo} alt="" className="w-7/12 " />
      </div>

      {/* Signup Form */}
      <div>
        <div className="flex flex-col gap-12">
          <h1 className="text-6xl font-bold">Login now to Tweet</h1>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col space-y-4 mt-4">
          <label className=" flex flex-col  text-lg">
            Email
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 outline-0 p-2 bg-transparent  rounded"
            />
          </label>

          <label className=" flex flex-col  text-lg">
            Password
            <input
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 outline-0 p-2 bg-transparent  rounded"
            />
          </label>

          <button className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 cursor-pointer">
            Login
          </button>
        </form>
        <Link
          to="/signup"
          className="block text-center text-sm text-gray-400 cursor-pointer"
        >
          Not have an account yet?
        </Link>
      </div>
    </div>
  );
};

export default loginPage;
