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
        <Link to="/Profile" className='nav-item'>Profile</Link>
        
      </nav>
    </div>
  );
};

export default Sidebar;
