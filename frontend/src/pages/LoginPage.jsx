import React from "react";
import twitterLogo from "../assets/logo.webp";
import { Link } from "react-router-dom";
const loginPage = () => {
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

        <form className="flex flex-col space-y-4 mt-4">
          <label className=" flex flex-col  text-lg">
            Email
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 outline-0 p-2 bg-transparent  rounded"
            />
          </label>

          <label className=" flex flex-col  text-lg">
            Password
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 outline-0 p-2 bg-transparent  rounded"
            />
          </label>

          <button className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 cursor-pointer">
            Create Account
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
