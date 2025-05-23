import React, { useContext, useState } from "react";
import twitterLogo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    proffession: "",
    location: "",
    password: "",
  });

  const { registerUser } = useContext(UserContext);

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(formData);
    setFormData({ name: "", email: "", profession: "", location: "", password: "" });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {/* Twitter Logo */}
      <div className="flex justify-center items-center">
        <img src={twitterLogo} alt="Twitter Logo" className="w-7/12" />
      </div>

      {/* Signup Form */}
      <div>
        <div className="flex flex-col gap-12">
          <h1 className="text-6xl font-bold">Happening Now</h1>
          <h3 className="text-3xl font-bold">Join Today.</h3>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col space-y-4 mt-4">
          <label className="flex flex-col text-lg">
            Name
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 outline-0 p-2 bg-transparent text-white rounded"
            />
          </label>

          <label className="flex flex-col text-lg">
            Profession
            <input
              value={formData.proffession}
              onChange={(e) => setFormData({ ...formData, proffession: e.target.value })}
              type="text"
              placeholder="Enter your Profession"
              className="border border-gray-300 outline-0 p-2 bg-transparent rounded"
            />
          </label>

          <label className="flex flex-col text-lg">
            Location
            <input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              type="text"
              placeholder="Enter your Location"
              className="border border-gray-300 outline-0 p-2 bg-transparent rounded"
            />
          </label>

          <label className="flex flex-col text-lg">
            Email
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 outline-0 p-2 bg-transparent rounded"
            />
          </label>

          <label className="flex flex-col text-lg">
            Password
            <input
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 outline-0 p-2 bg-transparent rounded"
            />
          </label>

          <button className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 cursor-pointer">
            Create Account
          </button>
        </form>

        <Link to="/login" className="block text-center text-sm text-gray-400 cursor-pointer">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
