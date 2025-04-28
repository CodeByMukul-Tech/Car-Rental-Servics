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
        <Link to="/Display" className="nav-item">Car for Rent</Link>
        <Link to="/Feedback" className='nav-item'>Feedback</Link>
        <Link to="/BookingHistory" className="nav-item">Booking history</Link>
        <Link to="/Booking" className='nav-item'>Booking</Link>
        <Link to="/Userinfo" className='nav-item'>User_information</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
