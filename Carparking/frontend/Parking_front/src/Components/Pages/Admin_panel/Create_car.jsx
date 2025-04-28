import React, { useState } from 'react';
import axios from 'axios';
import './Create.css';

const InsertData = () => {
  const [formData, setFormData] = useState({
    car_model: '',
    car_brand: '',
    car_type: '',
    car_price: '',
    first_owner_name: '',
    first_owner_state: '',
    year_of_manufacture: '',
    registration_number: '',
    engine_capacity_cc: '',
    car_image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      car_image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = localStorage.getItem('role'); // Get role from localStorage

      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }
      formPayload.append('role', role);

      const response = await axios.post('http://localhost:5000/api/add-car', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert(response.data.message);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to add car');
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="car-form">
        <h2 className="form-title">Add Car Details</h2>

        <div className="input-field-1">
          <div className="input-field">
            <input type="text" name="car_model" placeholder="Car Model" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <input type="text" name="car_brand" placeholder="Car Brand" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <input type="text" name="car_type" placeholder="Car Type (SUV/Sedan etc.)" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <input type="number" name="car_price" placeholder="Car Price" onChange={handleChange} required />
          </div>
        </div>

        <div className="input-field-wrapper">
          <div className="input-field">
            <input type="text" name="first_owner_name" placeholder="First Owner Name" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <input type="text" name="first_owner_state" placeholder="First Owner State" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <input type="number" name="year_of_manufacture" placeholder="Year of Manufacture" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <input type="text" name="registration_number" placeholder="Registration Number" onChange={handleChange} required />
          </div>
        </div>

        <div className="input-field-wrapper">
          <div className="input-field">
            <input type="number" name="engine_capacity_cc" placeholder="Engine Capacity (CC)" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <input type="file" name="car_image" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        <div className="input-field-wrapper">
          <button type="submit" className="submit-btn">Add Car</button>
        </div>
      </form>
    </div>
  );
};

export default InsertData;
