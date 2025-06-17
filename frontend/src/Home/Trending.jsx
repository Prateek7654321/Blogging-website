import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 my-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🔥 Trending Blogs</h1>
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3500}>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element) => (
            <div
              key={element._id}
              className="mx-2 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-xl rounded-2xl overflow-hidden transition-transform hover:scale-105 duration-300 border border-gray-200"
            >
              <Link to={`/blog/${element._id}`}>
                <div className="relative">
                  <img
                    src={element.blogImage.url}
                    alt="blog"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                    {element.category}
                  </div>
                </div>
                <div className="p-4 bg-white h-36 flex flex-col justify-between">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 truncate">
                    {element.title}
                  </h2>
                  <div className="flex items-center">
                    <img
                      src={element.adminPhoto}
                      alt="Author"
                      className="w-10 h-10 rounded-full border-2 border-indigo-400 shadow-md"
                    />
                    <p className="ml-3 text-sm text-gray-600 font-medium">
                      {element.adminName}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-48 col-span-full">
            <p className="text-gray-500">Loading blogs...</p>
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
