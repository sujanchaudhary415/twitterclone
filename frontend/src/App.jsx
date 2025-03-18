import React from "react";
import SignupPage from "./pages/SignupPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="bg-black w-full h-full text-white">
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
