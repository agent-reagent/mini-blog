import React, { useState } from "react";
import { createBlog } from "../services/blogService";
import axios from "axios";
const API_URL = "http://localhost:5000/api";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    subheading: "",
    content: "",
  });

  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const withImg = { ...formData, image };
    await createBlog(withImg);
    alert("Blog created successfully");
    setFormData({ title: "", subheading: "", content: "" });
  };

  const handleImageUpload = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];

    if (!file) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(response.data.imageUrl);
      setFormData((prev) => ({ ...prev, image: response.data.imageUrl }));
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
      alert("Error uploading image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Create a New Blog
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the blog title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="subheading"
            className="block text-sm font-medium text-gray-600"
          >
            Subheading
          </label>
          <input
            type="text"
            id="subheading"
            name="subheading"
            placeholder="Enter the blog subheading"
            value={formData.subheading}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your blog content here..."
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full h-40 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          />
        </div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {/* {image && (
          <img src={image} alt="Preview" style={{ maxWidth: "200px" }} />
        )} */}
        <button
          type="submit"
          className="w-full py-3 my-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
