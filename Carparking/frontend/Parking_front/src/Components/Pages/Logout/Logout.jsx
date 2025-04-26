import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to the server to clear the session
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });

      // Clear session or token from local storage or cookies if used
      // You can clear any session data here, for example:
      // localStorage.removeItem("session_user_id");
      // Or if using cookies:
      // document.cookie = "session_user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      
      alert('Logout Successful!');
      localStorage.clear();
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
