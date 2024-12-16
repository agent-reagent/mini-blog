import React, { useState } from "react";
import { createBlog } from "../services/blogService";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    subheading: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBlog(formData);
    alert("Blog created successfully");
    setFormData({ title: "", subheading: "", content: "" });
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col align-middle justify-center w-full max-w-lg py-4 space-x-4 space-y-4  p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="rounded-lg p-2"
        />
        <input
          type="text"
          name="subheading"
          placeholder="Subheading"
          value={formData.subheading}
          onChange={handleChange}
          required
          className="rounded-lg p-2"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          className="rounded-lg p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
