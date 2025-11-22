import React, { useState } from "react";
import "./App.css";
import Logo from "./Assets/logo.png";
import { Link } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    program: "",
    yearLevel: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((v) => !v)) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    alert("Registration successful!");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={Logo} alt="Logo" className="logo" />

        <h1>Create Account</h1>
        <p className="subtitle">Register to start booking library spaces</p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-box">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Juan"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </div>

            <div className="input-box">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Dela Cruz"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="input-box">
            <label>Student ID</label>
            <input
              type="text"
              placeholder="2025-1004"
              value={formData.studentId}
              onChange={(e) => updateField("studentId", e.target.value)}
            />
          </div>

          <div className="input-box">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="student@cit.edu"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          <div className="row">
            <div className="input-box">
              <label>Program</label>
              <select
                value={formData.program}
                onChange={(e) => updateField("program", e.target.value)}
              >
                <option value="">Select program</option>
                <option value="BSIT">BSIT</option>
                <option value="BSCS">BSCS</option>
                <option value="BSEE">BSEE</option>
              </select>
            </div>

            <div className="input-box">
              <label>Year Level</label>
              <select
                value={formData.yearLevel}
                onChange={(e) => updateField("yearLevel", e.target.value)}
              >
                <option value="">Select year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-box">
              <label>Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
              />
            </div>

            <div className="input-box">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  updateField("confirmPassword", e.target.value)
                }
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>

          <p className="reg-login">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>

          <Link to="/">
            <button type="button" className="home-btn">
              Back to Home
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Registration;
