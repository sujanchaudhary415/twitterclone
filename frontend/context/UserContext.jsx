import { createContext, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      setUser(res.data);
    } catch (error) {
      setUser(null);
      toast.error("Failed to check authentication");
    } finally {
      setIsCheckingAuth(false); // ✅ Always set to false
    }
  };

  const registerUser = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      setUser(res.data);
      toast.success("User registered successfully");
    } catch (error) {
      toast.error("Failed to register user");
      console.log(error);
    }
  };

  const loginUser = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      setUser(res.data);
      toast.success("User logged in successfully");
    } catch (error) {
      toast.error("Failed to login user");
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      toast.success("User logged out successfully");
    } catch (error) {
      toast.error("Failed to logout user");
      console.log(error);
    }
  };

  const updateProfile = async (data) => {
    try {
      const res = await axiosInstance.put("/auth/updateProfile", data);
      setUser(res.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        setIsCheckingAuth,
        isCheckingAuth,
        checkAuth,
        logoutUser,
        updateProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
