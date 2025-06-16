import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../util";
function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/users/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <nav className="bg-black shadow-md text-white px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between container mx-auto">
          <div className="text-2xl font-bold tracking-wide">
            Cilli<span className="text-blue-500">Blog</span>
          </div>

          {/* Desktop Menu */}
          <div className="mx-6">
            <ul className="hidden md:flex space-x-6 text-lg font-medium">
              <Link to="/" className="hover:text-blue-400 duration-300">
                HOME
              </Link>
              <Link to="/blogs" className="hover:text-blue-400 duration-300">
                BLOGS
              </Link>
              <Link to="/creators" className="hover:text-blue-400 duration-300">
                CREATORS
              </Link>
              <Link to="/about" className="hover:text-blue-400 duration-300">
                ABOUT
              </Link>
              <Link to="/contact" className="hover:text-blue-400 duration-300">
                CONTACT
              </Link>
            </ul>
            <div className="md:hidden" onClick={() => setShow(!show)}>
              {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>

          <div className="hidden md:flex space-x-3">
            {isAuthenticated && profile?.user?.role === "admin" && (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded shadow"
              >
                DASHBOARD
              </Link>
            )}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded shadow"
              >
                LOGIN
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded shadow"
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {show && (
          <div className="bg-black text-white md:hidden w-full">
            <ul className="flex flex-col items-center space-y-6 py-8 text-lg font-medium">
              <Link
                to="/"
                onClick={() => setShow(false)}
                className="hover:text-blue-400"
              >
                HOME
              </Link>
              <Link
                to="/blogs"
                onClick={() => setShow(false)}
                className="hover:text-blue-400"
              >
                BLOGS
              </Link>
              <Link
                to="/creators"
                onClick={() => setShow(false)}
                className="hover:text-blue-400"
              >
                CREATORS
              </Link>
              <Link
                to="/about"
                onClick={() => setShow(false)}
                className="hover:text-blue-400"
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                onClick={() => setShow(false)}
                className="hover:text-blue-400"
              >
                CONTACT
              </Link>
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setShow(false)}
                  className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-800"
                >
                  LOGIN
                </Link>
              ) : (
                <button
                  onClick={(e) => {
                    setShow(false);
                    handleLogout(e);
                  }}
                  className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-800"
                >
                  LOGOUT
                </button>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
