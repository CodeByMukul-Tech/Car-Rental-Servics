import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

      if (response.ok) {
        alert("Registration Successful!");
        document.body.style.backgroundColor= "green";
      } else {
        alert("Registration Failed. Please try again.");
        document.body.style.backgroundColor= "red";
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
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
          placeholder="User ID"
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
