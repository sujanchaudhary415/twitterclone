import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { Outlet } from "react-router-dom"; // Outlet renders child routes

const Layout = () => {
  return (
    <div className="px-28 h-screen text-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-[20%] h-full">
          <LeftSidebar />
        </div>

        {/* Main Content (Dynamic Page Content) */}
        <div className="w-[60%] h-full">
          <Outlet />
        </div>

        {/* Right Sidebar */}
        <div className="w-[20%] h-full">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
