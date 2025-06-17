import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../util.js"; // import the backend URL

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("jwt");
        if (token) {
          const { data } = await axios.get(
            `${BACKEND_URL}/api/users/my-profile`,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Profile fetch error:", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/all-blogs`,
          { withCredentials: true }
        );
        setBlogs(data);
      } catch (error) {
        console.log("Blogs fetch error:", error);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
