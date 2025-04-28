import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Custom styles

function Navbar() {
  const [authStatus, setAuthStatus] = useState('loading'); // State to track login status

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Check if session exists and update authStatus accordingly
      if (localStorage.getItem('session_user_id') !== null) {
        setAuthStatus('loggedIn');
      } else {
        setAuthStatus('loggedOut');
      }
    }, 1000); // 1-second delay to switch state

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">Home</Link>
                <Link to="/Profile" className='navbar-link'>Profile</Link>
                <Link to="/Display" className="navbar-link">Car for Rent</Link>
                <Link to="/Feedback" className='navbar-link'>Feedback</Link>
                <Link to="/BookingHistory" className="navbar-link">Booking history</Link>
                <Link to="/Booking" className='navbar-link'>Booking</Link>
                <Link to="/Userinfo" className='navbar-link'>User_information</Link>
                <Link to="/Payment" className='navbar-link'>Payment</Link>
        <ul className="navbar-links">
          {authStatus === 'loading' ? (
            <li className="navbar-item">Loading...</li> // You can show a loading indicator or spinner
          ) : authStatus === 'loggedIn' ? (
            <>
              <li className="navbar-item">
                <Link className="navbar-link" to="/logout">Logout</Link>
              </li>
              {localStorage.getItem('role') === 'admin' && (
                <li className="navbar-item">
                  <Link className="navbar-link" to="/admin">Admin Panel</Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link className="navbar-link" to="/login">Login</Link>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
