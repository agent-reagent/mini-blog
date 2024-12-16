import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../services/blogService";

const BlogDetails = () => {
  const { id } = useParams(); // Extract the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <h3>{blog.subheading}</h3>
      <p>{blog.content}</p>
      <p>
        <strong>Created At:</strong> {new Date(blog.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default BlogDetails;
