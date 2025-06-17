import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  // Store comments as: { [blogId]: [{user, text, createdAt}] }
  const [allComments, setAllComments] = useState({});

  // Load all blog comments from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("blog-comments");
    if (stored) setAllComments(JSON.parse(stored));
  }, []);

  // Save comments to localStorage when changed
  useEffect(() => {
    localStorage.setItem("blog-comments", JSON.stringify(allComments));
  }, [allComments]);

  const handleCommentSubmit = (e, blogId, user, text, setUser, setText) => {
    e.preventDefault();
    if (!user.trim() || !text.trim()) return;

    const newComment = {
      user,
      text,
      createdAt: new Date().toLocaleString(),
    };

    setAllComments((prev) => ({
      ...prev,
      [blogId]: [newComment, ...(prev[blogId] || [])],
    }));

    setUser("");
    setText("");
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Explore Blogs
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover thoughts, stories, and ideas from creators across the world.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog, index) => {
              const [user, setUser] = useState("");
              const [text, setText] = useState("");
              const comments = allComments[blog.id] || [];

              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link to={`/blog/${blog.id}`}>
                    <div className="h-52 overflow-hidden">
                      <img
                        src={blog?.blogImage?.url}
                        alt={blog?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-2">
                        {blog?.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-3">
                        {blog?.description || "No description provided."}
                      </p>
                      <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                        {blog?.category}
                      </div>
                    </div>
                  </Link>

                  {/* Comment Box */}
                  <div className="p-4 border-t">
                    <form
                      onSubmit={(e) =>
                        handleCommentSubmit(
                          e,
                          blog.id,
                          user,
                          text,
                          setUser,
                          setText
                        )
                      }
                      className="space-y-2"
                    >
                      <input
                        type="text"
                        placeholder="Your name"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                        required
                      />
                      <textarea
                        placeholder="Write a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full p-2 border rounded text-sm h-20"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white text-sm py-2 rounded hover:bg-indigo-700"
                      >
                        Post Comment
                      </button>
                    </form>

                    {/* Comments List */}
                    <div className="mt-4 space-y-2">
                      {comments.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No comments yet.
                        </p>
                      ) : (
                        comments.map((comment, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-100 p-2 rounded text-sm"
                          >
                            <p className="font-medium">{comment.user}</p>
                            <p>{comment.text}</p>
                            <p className="text-xs text-gray-500">
                              {comment.createdAt}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No blogs found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
