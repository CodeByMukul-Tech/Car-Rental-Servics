import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import Location  from '../Location/Location'; // Importing Location component

function Home() {
  const [userData, setUserData] = useState({});
  const [loginDate, setLoginDate] = useState('');

  useEffect(() => {
    const userid = localStorage.getItem('session_user_id');  // assuming userid stored after login
    console.log(userid);
    
    if (userid) {
      axios.get(`http://localhost:5000/api/user_info/${userid}`)
        .then(response => {
          setUserData(response.data);
          setLoginDate(new Date().toLocaleString()); // set login time
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <div className="home-background">
      <div className="home-container">
        <div className="user-card">
          <div className="user-info">
            <p><strong>User ID:</strong> {userData.userid}</p>
          </div>
          <div className="user-image">
            {userData.image ? (
              <img src={`data:image/jpeg;base64,${userData.image}`} alt="User" />
            ) : (
              <img src='/images/userprofile.jpeg'/>
            )}
          </div>
          <div className="login-date">
            <p><strong>Login Date:</strong> {loginDate}</p>
          </div>
        </div>
        <h1><Location/></h1>
      </div>
    </div>
  );
}

export default Home;
