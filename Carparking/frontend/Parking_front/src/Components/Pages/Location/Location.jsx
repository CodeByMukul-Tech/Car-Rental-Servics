import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Location.css'; // We'll style it separately

function Location() {
  const [carData, setCarData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/car-location-data')
      .then(response => {
        setCarData(response.data);
      })
      .catch(error => {
        console.error('Error fetching car location data:', error);
      });
  }, []);

  return (
    <div className="car-location-container">
      {Object.keys(carData).map((state, index) => (
        <div className="car-location-card" key={index}>
          <h3>{state}</h3>
          <p><strong>SUV:</strong> {carData[state].SUV}</p>
          <p><strong>Sedan:</strong> {carData[state].Sedan}</p>
          <p><strong>Sports:</strong> {carData[state].Sports}</p>
        </div>
      ))}
    </div>
  );
}

export default Location;
