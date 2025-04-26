import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // We'll add custom styles in a separate file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-logo" to="/">Brand</Link>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link className="navbar-link" to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/login">Login</Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/register">Register</Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/logout">logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
