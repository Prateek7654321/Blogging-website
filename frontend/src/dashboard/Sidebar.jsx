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
    setShow(false); // close mobile menu on click
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
      <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img
            src={profile?.user?.photo?.url}
            alt="profile"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <span className="text-lg font-semibold">{profile?.user?.name}</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 font-medium text-gray-700">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="hover:text-blue-600 transition"
          >
            MY BLOGS
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="hover:text-blue-600 transition"
          >
            CREATE BLOG
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="hover:text-blue-600 transition"
          >
            MY PROFILE
          </button>
          <button
            onClick={gotoHome}
            className="hover:text-blue-600 transition"
          >
            HOME
          </button>
          <button
            onClick={handleLogout}
            className="hover:text-red-600 transition"
          >
            LOGOUT
          </button>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-2xl" onClick={() => setShow(!show)}>
          {show ? <IoClose /> : <CiMenuBurger />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {show && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 font-medium text-gray-700">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="block w-full text-left hover:text-blue-600"
          >
            MY BLOGS
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="block w-full text-left hover:text-blue-600"
          >
            CREATE BLOG
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="block w-full text-left hover:text-blue-600"
          >
            MY PROFILE
          </button>
          <button
            onClick={gotoHome}
            className="block w-full text-left hover:text-blue-600"
          >
            HOME
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left hover:text-red-600"
          >
            LOGOUT
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
