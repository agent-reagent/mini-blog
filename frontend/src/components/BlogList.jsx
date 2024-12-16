import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../services/blogService";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await getAllBlogs();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-6">
      <div className="col-span-full">
        <h1>Blogs</h1>
      </div>
      {blogs.map((blog) => (
        <ul
          key={blog._id}
          className="bg-black shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="bg-slate-800 rounded-full p-5 font-bold">
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          </h2>
          <p className="text-purple-800 mt-2">{blog.subheading}</p>
        </ul>
      ))}
    </div>
  );
};

export default BlogList;
