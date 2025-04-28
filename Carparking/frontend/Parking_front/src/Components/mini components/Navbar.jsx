import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Custom styles

function Navbar() {
  const [authStatus, setAuthStatus] = useState('loading');

  useEffect(() => {
    if (localStorage.getItem('session_user_id') !== null) {
      setAuthStatus('loggedIn');
    } else {
      setAuthStatus('loggedOut');
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2>.</h2>
        <ul className="navbar-links">
          {authStatus === 'loading' ? (
            <li className="navbar-item">Loading...</li>
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
