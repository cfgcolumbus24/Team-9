import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-500 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-lg font-bold">adaptED</h1>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/retention" className="text-white hover:text-gray-300">
            Retention Tracker
          </Link>
          <Link to="/lessonplanner" className="text-white hover:text-gray-300">
            Lesson Planner
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-300">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
