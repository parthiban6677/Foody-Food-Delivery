import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:4000/api/user/register", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
                localStorage.setItem("token", data.token);
                navigate("/"); 
            } else {
                toast.error(data.message || "Not Registered");
            }

        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    return (
        <div>
            <h1>Foody Club</h1>

            <div className="login-container">
                <form className="login-box" onSubmit={onRegister}>

                    <h2>Register</h2>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />

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

                    <button type="submit">Register</button>

                  
                    <p style={{ marginTop: "10px",color:'black' }}>
                        Already have an account?  
                        <Link to="/Login" style={{ color: "orange", marginLeft: "5px" }}>
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Register;
