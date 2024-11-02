import React from "react";
import { Link } from "react-router-dom";
import "../pages/Navbar.css"; // Adjusted path to point to the pages folder

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">adaptED</h1>
        <div>
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/retention" className="navbar-link">Retention Tracker</Link>
          <Link to="/lessonplanner" className="navbar-link">Lesson Planner</Link>
          <Link to="/profile" className="navbar-link">Profile</Link>
            <div className="search-bar"><input type="search" placeholder="Search"></input></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
