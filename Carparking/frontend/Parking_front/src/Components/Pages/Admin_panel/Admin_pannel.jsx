import React from "react";
import './Admin.css'; // Import your CSS file for styling
import { Link } from "react-router-dom";
import Create_car from "./Create_car"; // Import the Create_car component
function Admin_panel() {
  return (
    <div>
      <Create_car/>
    
    </div>
  );
}
export default Admin_panel;