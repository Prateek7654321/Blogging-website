import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Devotional() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-pink-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-yellow-800 mb-4">
          🙏 Devotional Blogs
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Explore spiritual insights, devotionals, and divine wisdom from various cultures and traditions.
        </p>

        {devotionalBlogs && devotionalBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {devotionalBlogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className="group relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform transition-all duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h2 className="text-xl font-semibold">{blog?.title}</h2>
                  <p className="text-sm italic text-yellow-300">{blog?.category}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : blogs && blogs.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            No devotional blogs found.
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <p className="text-gray-400 text-lg">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Devotional;
