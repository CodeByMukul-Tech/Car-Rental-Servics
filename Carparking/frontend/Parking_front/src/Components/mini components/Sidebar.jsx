// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // custom CSS

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">FancyCarRental</h2>
      <nav className="nav-links">
      <Link to="/" className="navbar-link">Home</Link>
                <Link to="/Profile" className='navbar-link'>Profile</Link>
                <Link to="/Display" className="navbar-link">Car for Rent</Link>
                <Link to="/Feedback" className='navbar-link'>Feedback</Link>
                <Link to="/BookingHistory" className="navbar-link">Booking history</Link>
                <Link to="/Booking" className='navbar-link'>Booking</Link>
                <Link to="/Userinfo" className='navbar-link'>User_information</Link>
                <Link to="/Payment" className='navbar-link'>Payment</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
