import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        localStorage.setItem('session_user_id', data.session_user_id); // Store session email ID in localStorage
        // console.log(data.session_user_id); // Log the session ID for debugging
        
         // Store session ID in localStorage
        // console.log('Login Successful!');
        // console.log('Session User ID:', data.session_user_id);  // ✅ Session ID
        // console.log('Username:', data.username);
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
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', margin: '10px 0' }}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', margin: '10px 0' }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
