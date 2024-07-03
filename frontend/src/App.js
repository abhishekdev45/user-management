import React, { useState } from "react";
import {  Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserPage from "./pages/UserPage/Userpage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import CreateUser from "./pages/CreateUser/Createuser";

const App = () => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);


  const toggleSidebar = () => {
    setOpen(!open);
  };

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/users", label: "Users" },
    userInfo?.role === "Admin" && {
      path: "/create-user",
      label: "Create User",
    },
  ].filter(Boolean);

  return (
    <div className="flex flex-col h-screen">
      {userInfo && <Navbar toggleSidebar={toggleSidebar} open={open} />}
      <div className="flex">
        {userInfo && (
          <Sidebar links={links} open={open} toggleSidebar={toggleSidebar} />
        )}
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/" element={<Login />} />
          </Routes>
        
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default App;
