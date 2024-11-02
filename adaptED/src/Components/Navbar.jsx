import React from "react";
import { Link } from "react-router-dom";
import "../pages/Navbar.css"; // Adjusted path to point to the pages folder
import logo from "../Images/logo.png";


const Navbar = () => {
  return (
    <nav className="bg-[#611171] shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 lg:px-6">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-14 w-14 rounded-full" />
          <h1 className="text-3xl font-bold text-[#efeeea]">adaptED</h1>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-[#efeeea] hover:text-[#00abab] font-semibold transition duration-200">
            Home
          </Link>
          <Link to="/retention" className="text-[#efeeea] hover:text-[#00abab] font-semibold transition duration-200">
            Retention Tracker
          </Link>
          <Link to="/lessonplanner" className="text-[#efeeea] hover:text-[#00abab] font-semibold transition duration-200">
            Lesson Planner
          </Link>
          <Link to="/profile" className="text-[#efeeea] hover:text-[#00abab] font-semibold transition duration-200">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
