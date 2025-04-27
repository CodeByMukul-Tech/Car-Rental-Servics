// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // custom CSS

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">FancyCarRental</h2>
      <nav className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/cars" className="nav-item">Cars</Link>
        <Link to="/about" className="nav-item">About Us</Link>
        <Link to="/contact" className="nav-item">Contact</Link>
        <Link to="/book" className="nav-item">Book Now</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
