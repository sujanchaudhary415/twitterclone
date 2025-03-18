import React, { useContext, useEffect } from "react";
import SignupPage from "./pages/SignupPage";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import { UserContext } from "../context/UserContext";

const App = () => {
  const {user,checkAuth,isCheckingAuth}=useContext(UserContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center text-4xl">
        Loading...
      </div>
    ); // Show loading spinner while checking auth
  }
  return (
    <div className="bg-black w-full h-full text-white">
      <ToastContainer />
      <Routes>
        <Route path="/" element={user?<HomePage />:<Navigate to="/login"/>} />
        <Route path="/signup" element={!user?<SignupPage />:<Navigate to="/"/>} />
        <Route path="/login" element={!user?<LoginPage />:<Navigate to="/"/>} />
      </Routes>
    </div>
  );
};

export default App;
