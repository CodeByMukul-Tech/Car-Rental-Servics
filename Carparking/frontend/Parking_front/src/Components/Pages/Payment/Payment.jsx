import React from 'react';
import { useParams } from 'react-router-dom';
import './Payment.css';

function PaymentPage() {
  const { carId, bookingId, price } = useParams();

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Car ID: {carId}</p>
      <p>Booking ID: {bookingId}</p>
      <p>Amount to Pay: ₹{price}</p>

      {/* Future: Integrate Razorpay / Stripe / Paytm etc. */}
      <button>Pay Now</button>
    </div>
  );
}

export default PaymentPage;
