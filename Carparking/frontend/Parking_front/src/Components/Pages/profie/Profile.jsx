import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // <-- Import CSS file

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    state: '',
    city: '',
    house_address: '',
    phone_no: '',
    image: null,
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const userid = localStorage.getItem('session_user_id');
    const role = localStorage.getItem('role');

    if (!userid || role !== 'customer') {
      alert('Unauthorized access! Only customers allowed.');
      window.location.href = '/login';
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setUserData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userid', localStorage.getItem('session_user_id'));
    formData.append('username', userData.username);
    formData.append('state', userData.state);
    formData.append('role',localStorage.getItem('role'));
    formData.append('city', userData.city);
    formData.append('house_address', userData.house_address);
    formData.append('phone_no', userData.phone_no);
    if (userData.image) {
      formData.append('image', userData.image);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/profile', formData);
      setMessage(res.data.message);
      if (res.data.success) {
        alert('Profile updated successfully!');
        window.location.href = '/'; // Redirect to customer dashboard
      } else {
        alert('Failed to update profile!');
      }
    } catch (err) {
      console.log(err.response);
      
      console.error(err);
      setMessage('Something went wrong!');
    }
  };

  return (
    <div className="profile-container">
      <h2>Customer Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="text" name="house_address" placeholder="House Address" onChange={handleChange} required />
        <input type="text" name="phone_no" placeholder="Phone No" onChange={handleChange} required />
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Save Profile</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Profile;
