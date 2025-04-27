import { useState } from "react";
import './Register.css'
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = { email, userid, password };
  
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();  // 👈 Important: read the server's JSON message
  
      if (response.ok) {
        alert(result.message); 
        navigate('/') // Registration Successful
        // document.body.style.backgroundColor = "green";

      } else {
        alert(result.message);  // Email already registered OR User ID already taken
        // document.body.style.backgroundColor = "red";
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong.");
    }
  };
  

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br/>

        <input
          type="text"
          placeholder="User Name"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          required
        />
       <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
