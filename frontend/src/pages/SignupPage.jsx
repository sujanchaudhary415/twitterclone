import React from "react";
import twitterLogo from "../assets/logo.webp";
import { Link } from "react-router-dom";
const signupPage = () => {
  return (
    <div className="h-screen flex justify-center items-center  ">
      {/* twitter Logo */}
      <div className="flex justify-center items-center">
        <img src={twitterLogo} alt="" className="w-7/12" />
      </div>

      {/* Signup Form */}
      <div c>
        <div className="flex flex-col gap-12">
          <h1 className="text-6xl font-bold" >Happening Now</h1>
          <h3 className="text-3xl font-bold">Join Today.</h3>
        </div>

        <form className="flex flex-col space-y-4 mt-4">
          <label className="flex flex-col text-lg">
            Name
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 outline-0 p-2 bg-transparent text-white rounded"
            />
          </label>

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
        <Link to='/login' className="block text-center text-sm text-gray-400 cursor-pointer">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default signupPage;
