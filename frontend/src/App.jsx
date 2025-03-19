import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserContext";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout"; // Import the Layout component
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useContext(UserContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center text-4xl">
        Loading...
      </div>
    ); 
  }

  return (
    <div className="bg-black w-full h-full text-white">
      <ToastContainer />
      <Routes>
        {/* Login & Signup Routes (No Sidebar) */}
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

        {/* Protected Routes Wrapped in Layout */}
        <Route element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/myProfile" element={<ProfilePage />} />
          {/* Add more pages here (e.g., Profile, Dashboard, etc.) */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
