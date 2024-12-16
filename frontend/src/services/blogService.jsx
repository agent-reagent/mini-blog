import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllBlogs = async () => axios.get(`${API_URL}/blogs`);
export const getBlogById = async (id) => axios.get(`${API_URL}/blogs/${id}`);
export const createBlog = async (blog) => axios.post(`${API_URL}/blogs`, blog);
export const updateBlog = async (id, blog) =>
  axios.put(`${API_URL}/blogs/${id}`, blog);
export const deleteBlog = async (id) => axios.delete(`${API_URL}/blogs/${id}`);
