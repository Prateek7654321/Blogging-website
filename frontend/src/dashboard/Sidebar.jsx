import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../util";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
    setShow(false);
  };

  const gotoHome = () => {
    navigateTo("/");
    setShow(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img
            src={profile?.user?.photo?.url}
            alt="profile"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <span className="text-base font-semibold text-gray-700">{profile?.user?.name}</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-800 items-center justify-center text-center">
          {[
            ["MY BLOGS", () => handleComponents("My Blogs")],
            ["CREATE BLOG", () => handleComponents("Create Blog")],
            ["MY PROFILE", () => handleComponents("My Profile")],
            ["HOME", gotoHome],
            ["LOGOUT", handleLogout],
          ].map(([label, action], idx) => (
            <li key={idx}>
              <button
                onClick={action}
                className="transition-all duration-300 hover:text-blue-600 hover:scale-105"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-2xl" onClick={() => setShow(!show)}>
          {show ? <IoClose /> : <CiMenuBurger />}
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col items-center space-y-4 text-gray-700 font-medium">
          {[
            ["MY BLOGS", () => handleComponents("My Blogs")],
            ["CREATE BLOG", () => handleComponents("Create Blog")],
            ["MY PROFILE", () => handleComponents("My Profile")],
            ["HOME", gotoHome],
            ["LOGOUT", handleLogout],
          ].map(([label, action], idx) => (
            <button
              key={idx}
              onClick={action}
              className="transition-all duration-300 hover:text-blue-600 hover:scale-105"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default Sidebar;
