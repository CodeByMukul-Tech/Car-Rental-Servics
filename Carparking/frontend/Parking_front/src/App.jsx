import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/Pages/Register/Register.jsx"; // (you had typo 'Regiter')
import Login from "./Components/Pages/Login/Login.jsx";
import Home from "./Components/Pages/home/Home.jsx";
import Navbar from "./Components/mini components/Navbar.jsx"
import PaymentPage from "./Components/Pages/Payment/Payment.jsx"; // Corrected import path
import Logout from "./Components/Pages/Logout/Logout.jsx";
import Sidebar from "./Components/mini components/Sidebar.jsx";
import Admin_panel from "./Components/Pages/Admin_panel/Admin_pannel.jsx";
import Profile from "./Components/Pages/profie/Profile.jsx"; // Corrected import path
import Create_car from "./Components/Pages/Admin_panel/Create_car.jsx"; // Corrected import path
import BookingHistory from "./Components/Pages/bookinghistory/BookingHistory.jsx";
import Feedback from './Components/Pages/feedbacks.jsx/Feedback.jsx'
import Display from './Components/Pages/Dispaycars/Display.jsx'
import Booking from './Components/Pages/booking/Booking.jsx';
import User_information from "./Components/Pages/User_information/User_information.jsx";
function App() {
  return (
    <>




      <Navbar />
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin_panel />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path='/create-car' element={<Create_car />} />
        <Route path='/Feedback' element={<Feedback />} />
        <Route path='/Display' element={<Display />} />
        <Route path="/BookingHistory" element={<BookingHistory />} />
        <Route path="/Booking/:carid/:price" element={<Booking />} />
        <Route path="/Userinfo" element={<User_information/>}/>
        <Route path="/payment/:carId/:bookingId/:price" element={<PaymentPage />} />

      </Routes>

    </>
  );
}

export default App;
