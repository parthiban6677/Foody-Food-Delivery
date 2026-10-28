import React, { useContext, useState } from 'react';
import { StoreContext } from "../../context/StoreContextProvider";
import '../Login/logon.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext);

    const [currentState, setCurrentState] = useState("login");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newUrl = url;

        if (currentState === "login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const res = await axios.post(newUrl, data);

            if (res.data.success) {
                toast.success("Login Successful!");

                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);

                setShowLogin(false);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">

                <h2>{currentState === "login" ? "Login" : "Sign Up"}</h2>

                <form onSubmit={handleSubmit}>

               
                    {currentState === "signup" && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                    />

                    <button type="submit">
                        {currentState === "signup" ? "Create Account" : "Login"}
                    </button>

                    <div className="agree-box">
                        <input type="checkbox" required />
                        <p>By continuing, you agree to our terms.</p>
                    </div>

                    {currentState === "login" ? (
                        <p>
                            Create a new account?{" "}
                            <span onClick={() => setCurrentState("signup")}>
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <span onClick={() => setCurrentState("login")}>
                                Login here
                            </span>
                        </p>
                    )}

                </form>
            </div>
        </div>
    );
};

export default Login;
