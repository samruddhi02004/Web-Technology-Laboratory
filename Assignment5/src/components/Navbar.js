import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="brand-title">Sanjivani College of Engineering, Kopargaon</h2>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Add Event
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
