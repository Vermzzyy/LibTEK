import React, { useState } from "react";
import './App.css';
import { Link } from "react-router-dom";
import Logo from './Assets/logo.png'
import { useNavigate } from "react-router-dom";



const Login = () => {
 const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  if (Object.values(formData).some(v => !v)) {
    alert("Please fill in all fields.");
    return;
  }

  if (formData.password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  alert("Login successful!");
  navigate("/home");
};


  return (
    <>
      <div className="login-container">
        <div className="box">
                    <img
                      src={ Logo }
                      alt="Logo"
                      className="logo"
                    />
          <h1>Welcome back!</h1>
          <p className="subtitle">
            Login to access your library reservations
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">Login</button>

            <div className="forgot">
                <p>Forgot password?</p>
              </div>
            <div className="noacc">
                <p>Don't have an account?</p>
                 <Link to="/register" style={{ textDecoration: "none" }}>
                    <p class = "spanmsg">Login here</p>
                </Link>
            </div>
                <br/>
                <Link to="/">
                    <button className="home-btn">Back to Home</button>
                </Link>

          </form>
        </div>
      </div>
    </>
  );
};

export default Login