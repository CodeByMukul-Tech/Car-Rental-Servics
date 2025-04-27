import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Response:', data); // Log the entire response for debugging
      if (response.ok) {
        localStorage.setItem('session_user_id', data.session_user_id);

        localStorage.setItem('role', data.role);
        navigate('/'); // Redirect after success
        alert('Login Successful!');
      } else {
        console.log(data);

        console.error('Login failed:', data.message);
        alert('Invalid credentials');
        navigate('/login'); // Redirect after failure
      }

    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="login-page">


      <div className="login-container">
      
        <form className='form-login' onSubmit={handleLogin}>
        <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>

  );
};

export default Login;
