import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';

function Booking() {
    const { carid, price } = useParams(); // URL se car id and price
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        rent_date: '',
        rent_time: '',
        return_date: '',
        return_time: '',
        location: '',
        email_id: '',
        username: ''
    });
    const [bookingId, setBookingId] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('session_user_id');
        if (!storedUserId) {
            navigate('/login'); // Not logged in
        } else {
            setUserId(storedUserId);
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBooking = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/confirm-booking', {
                ...formData,
                user_id: userId,
                
                car_id: carid,
                price: price
            });

            alert('Booking Confirmed!');
            setBookingId(response.data.booking_id);

        } catch (error) {
            console.error('Booking failed:', error);
            alert('Failed to book.');
        }
    };

    const handlePayment = () => {
        if (bookingId) {
            navigate(`/payment/${carid}/${bookingId}/${price}/${userId}`);
        } else {
            alert('Please confirm booking first.');
        }
    };

    return (
        <div className="booking-container">
            <div className="booking-form">
                <h2>Booking Car ID: {carid}</h2>
                <p><strong>Price:</strong> ₹{price}</p>

                <input type="date" name="rent_date" placeholder="Rent Date" onChange={handleChange} required /><br />
                <input type="time" name="rent_time" placeholder="Rent Time" onChange={handleChange} required /><br />
                <input type="date" name="return_date" placeholder="Return Date" onChange={handleChange} required /><br />
                <input type="time" name="return_time" placeholder="Return Time" onChange={handleChange} required /><br />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} required /><br />
                <input type="email" name="email_id" placeholder="Email ID" onChange={handleChange} required /><br />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required /><br />

                <button onClick={handleBooking}>Confirm Booking</button>

                {bookingId && (
                    <button className="payment-btn" onClick={handlePayment}>
                        Proceed to Payment
                    </button>
                )}
            </div>
        </div>
    );
}

export default Booking;
