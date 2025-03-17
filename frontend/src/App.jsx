import React from "react";
import SignupPage from "./pages/SignupPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <div className="bg-black w-full h-full text-white">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
