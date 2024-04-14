import React from "react";
import "./navBar.css"

const Navbar = () => {
  return (
    <nav className="nav" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "var(--navbar-background-color)" }}>
      <div className="nav-links" style={{ display: "flex" }}>
        <a href="/" className="nav-link">Home</a>
        <a href="/sign" className="nav-link">Sign Up / Login</a>
        <a href="/upload" className="nav-link">Community Section</a>
        <a href="/about" className="nav-link">About Us</a>
        <a href="/location" className="nav-link">Location</a>
        <a href="/chatbot" className="nav-link">Chatbot</a>
      </div>
    </nav>
  );
};

export default Navbar;

