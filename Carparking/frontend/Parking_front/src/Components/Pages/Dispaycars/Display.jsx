import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Display.css';
import axios from 'axios';

function Display() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/all-cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  const handleBookNow = (carId, carPrice) => {
    navigate(`/booking/${carId}/${carPrice}`);
  };

  return (
    <div className="car-container">
      {cars.map((car) => (
        <div key={car.car_id} className="car-card">
          <img 
            src={car.car_image ? `data:image/jpeg;base64,${car.car_image}` : '/images/carplaceholder.jpeg'} 
            alt="Car" 
            className="car-image"
          />
          <h3>{car.car_brand} - {car.car_model}</h3>
          <p><strong>Type:</strong> {car.car_type}</p>
          <p><strong>Price:</strong> ₹{car.car_price}</p>
          <p><strong>Owner:</strong> {car.first_owner_name}</p>
          <p><strong>State:</strong> {car.first_owner_state}</p>
          <p><strong>Year:</strong> {car.year_of_manufacture}</p>
          <p><strong>Registration No.:</strong> {car.registration_number}</p>
          <p><strong>Engine Capacity:</strong> {car.engine_capacity_cc} CC</p>

          <button 
            onClick={() => handleBookNow(car.car_id, car.car_price)} 
            className="book-now-btn"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default Display;
