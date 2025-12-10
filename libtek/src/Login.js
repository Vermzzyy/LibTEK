import React, { useState } from "react";
import "./CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Assets/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); 
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => null);
        setError(errJson?.message || "Invalid email or password.");
        return;
      }

      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login successful!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/home");
      }, 1500);

    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server.");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">

          <img src={Logo} alt="Logo" className="login-logo" />

          <h1 className="login-title">Welcome back!</h1>
          <p className="login-subtitle">Login to access your library reservations</p>

          <form onSubmit={handleSubmit}>

            <div className="login-input-box">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>

            <div className="login-input-box">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
              />
            </div>

            {error && (
              <p className="login-error-below">{error}</p>
            )}

            <button type="submit" className="login-btn">Login</button>

            <div className="login-forgot">
              <p>Forgot password?</p>
            </div>

            <div className="login-noacc">
              <p>Don't have an account?</p>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <p className="login-spanmsg">Register</p>
              </Link>
            </div>

            <br />
            <Link to="/">
              <button className="home-btn-login">Back to Home</button>
            </Link>
          </form>
        </div>
      </div>

      {showToast && (
        <div className="toast success-toast">{message}</div>
      )}
    </>
  );
};

export default Login;
