import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../util";

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch Blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlogs(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load blog.");
      }
    };
    fetchBlog();
  }, [id]);

  // Load Comments from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`comments-${id}`);
    if (stored) setComments(JSON.parse(stored));
  }, [id]);

  // Save Comments to localStorage
  useEffect(() => {
    localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
  }, [comments, id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user.trim() || !text.trim()) return;
    const newComment = {
      user,
      text,
      createdAt: new Date().toLocaleString(),
    };
    setComments([newComment, ...comments]);
    setUser("");
    setText("");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-xl">
        {blogs && (
          <>
            <div className="text-indigo-600 text-sm font-medium uppercase mb-2">
              {blogs?.category}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {blogs?.title}
            </h1>
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={blogs?.adminPhoto}
                alt="Author"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <p className="text-lg text-gray-700 font-semibold">
                {blogs?.adminName}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {blogs?.blogImage?.url && (
                <img
                  src={blogs?.blogImage?.url}
                  alt="Blog Visual"
                  className="rounded-lg w-full h-[400px] object-cover shadow-md"
                />
              )}
              <div>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {blogs?.about}
                </p>
              </div>
            </div>

            {/* Comment Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Leave a Comment
              </h2>
              <form
                onSubmit={handleCommentSubmit}
                className="space-y-4 mb-6"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                  required
                />
                <textarea
                  placeholder="Write your comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg h-28 resize-none focus:outline-none focus:ring focus:ring-indigo-200"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Post Comment
                </button>
              </form>

              {/* Comments Display */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500">No comments yet.</p>
                ) : (
                  comments.map((c, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 p-4 rounded-md shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">{c.user}</span>
                        <span className="text-xs text-gray-500">
                          {c.createdAt}
                        </span>
                      </div>
                      <p className="text-gray-700">{c.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;
