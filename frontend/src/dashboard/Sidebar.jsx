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

  const navOptions = [
    { label: "MY BLOGS", color: "bg-green-500", action: () => handleComponents("My Blogs") },
    { label: "CREATE BLOG", color: "bg-blue-500", action: () => handleComponents("Create Blog") },
    { label: "MY PROFILE", color: "bg-pink-500", action: () => handleComponents("My Profile") },
    { label: "HOME", color: "bg-yellow-500", action: gotoHome },
    { label: "LOGOUT", color: "bg-red-500", action: handleLogout },
  ];

  return (
    <>
      {/* Top Navbar */}
      <div className="bg-white shadow-md px-4 py-4 sticky top-0 z-50">
        <div className="flex flex-col items-center">
          {/* Profile Info */}
          <div className="flex items-center gap-3 mb-3">
            <img
              src={profile?.user?.photo?.url}
              alt="profile"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <span className="text-base font-semibold text-gray-700">{profile?.user?.name}</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex flex-wrap justify-center items-center gap-4">
            {navOptions.map(({ label, color, action }, idx) => (
              <li key={idx}>
                <button
                  onClick={action}
                  className={`text-white px-4 py-2 rounded-lg ${color} transition-all duration-300 hover:brightness-90 hover:scale-105`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <div className="md:hidden text-2xl mt-2" onClick={() => setShow(!show)}>
            {show ? <IoClose /> : <CiMenuBurger />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col items-center space-y-4">
          {navOptions.map(({ label, color, action }, idx) => (
            <button
              key={idx}
              onClick={action}
              className={`w-full text-white px-4 py-2 rounded-lg ${color} transition-all duration-300 hover:brightness-90 hover:scale-105`}
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
