import React, { useState } from 'react'
import '../css/login.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();


      if (data.success) {
        toast.success("Login Successful");
        localStorage.setItem("token", data.token)
        navigate("/Additems");
      }
      else {

        toast.error(data.message || "Invalid Credentials");
      }

    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <h1>Foody Club</h1>

      <div className="login-container">
        <form className="login-box" onSubmit={handlesubmit}>

          <h2>Login</h2>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  );
};

export default Login;
