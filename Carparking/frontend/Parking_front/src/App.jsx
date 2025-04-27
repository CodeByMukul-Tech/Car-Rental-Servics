import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/Pages/Register/Register.jsx"; // (you had typo 'Regiter')
import Login from "./Components/Pages/Login/Login.jsx";
import Home from "./Components/Pages/home/Home.jsx";
import Navbar from "./Components/mini components/Navbar.jsx"
import { SessionProvider } from "./Components/Pages/Control_panel_of_api/SessionContext.jsx"; // Import the SessionProvider
import Logout from "./Components/Pages/Logout/Logout.jsx";
import Sidebar from "./Components/mini components/Sidebar.jsx";
import Admin_panel from "./Components/Pages/Admin_panel/Admin_pannel.jsx";
function App() {
  return (
    <>
    <SessionProvider>


    
      <Navbar />
      <Sidebar/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin_panel/>} />
      </Routes>
      </SessionProvider>
    </>
  );
}

export default App;
