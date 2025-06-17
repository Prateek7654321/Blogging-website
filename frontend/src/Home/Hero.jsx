import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();
  console.log(blogs);

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => (
          <Link
            to={`/blog/${element._id}`}
            key={element._id}
            className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-200"
          >
            <div className="group relative">
              <img
                src={element.blogImage.url}
                alt=""
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:opacity-80 transition duration-300"></div>
              <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-400 transition-colors duration-300">
                {element.title}
              </h1>
            </div>

            <div className="p-6 flex items-center bg-white/60 backdrop-blur-md">
              <img
                src={element.adminPhoto}
                alt=""
                className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow"
              />
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-800">
                  {element.adminName}
                </p>
                <p className="text-sm text-gray-500">New</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex h-screen items-center justify-center col-span-full">
          <p className="text-xl text-gray-500">Loading blogs...</p>
        </div>
      )}
    </div>
  );
}

export default Hero;
