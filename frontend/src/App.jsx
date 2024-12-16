import React from "react";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import BlogDetails from "./components/BlogDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <div>
          <h1 className="flex justify-end px-10 py-5">
            <a href="/">Blog App</a>
          </h1>
          <div className="py-5 grid grid-flow-row">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/create" element={<BlogForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
