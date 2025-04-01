import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserContext";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useContext(UserContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-4xl bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <ToastContainer />
      <Routes>
        {/* Login & Signup Routes */}
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

        {/* Protected Routes Wrapped in Layout */}
        <Route element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/myProfile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
