import React, { useState } from "react";
import "./CSS/Register.css";
import Logo from "./Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.studentId) newErrors.studentId = "Student ID is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.program) newErrors.program = "Select a program.";
    if (!formData.yearLevel) newErrors.yearLevel = "Select a year level.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";

    if (formData.password && formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const payload = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      idNumber: formData.studentId,     // FIXED
      yearLevel: formData.yearLevel,    // FIXED
      program: formData.program,
      email: formData.email,
      password: formData.confirmPassword,
    };

    try {
      const response = await fetch("http://localhost:8080/api/user/postUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        setErrors({ general: text || "Failed to register user." });
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrors({ general: "Error connecting to server." });
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={Logo} alt="Logo" className="register-logo" />

        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">
          Register to start booking library spaces
        </p>

        <form onSubmit={handleSubmit}>
          {errors.general && (
            <p className="error-text" style={{ textAlign: "center" }}>
              {errors.general}
            </p>
          )}

          <div className="register-row">
            <div className="register-input-box">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Juan"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className={errors.firstName ? "input-error" : ""}
              />
              {errors.firstName && (
                <p className="error-text">{errors.firstName}</p>
              )}
            </div>

            <div className="register-input-box">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Dela Cruz"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className={errors.lastName ? "input-error" : ""}
              />
              {errors.lastName && (
                <p className="error-text">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="register-input-box">
            <label>Student ID</label>
            <input
              type="text"
              placeholder="2025-1004"
              value={formData.studentId}
              onChange={(e) => updateField("studentId", e.target.value)}
              className={errors.studentId ? "input-error" : ""}
            />
            {errors.studentId && (
              <p className="error-text">{errors.studentId}</p>
            )}
          </div>

          <div className="register-input-box">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="student@cit.edu"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="register-row">
            <div className="register-input-box">
              <label>Program</label>
              <select
                value={formData.program}
                onChange={(e) => updateField("program", e.target.value)}
                className={errors.program ? "input-error" : ""}
              >
                <option value="">Select program</option>
                <option value="BSIT">BSIT</option>
                <option value="BSCS">BSCS</option>
                <option value="BSEE">BSEE</option>
              </select>
              {errors.program && (
                <p className="error-text">{errors.program}</p>
              )}
            </div>

            <div className="register-input-box">
              <label>Year Level</label>
              <select
                value={formData.yearLevel}
                onChange={(e) => updateField("yearLevel", e.target.value)}
                className={errors.yearLevel ? "input-error" : ""}
              >
                <option value="">Select year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
              {errors.yearLevel && (
                <p className="error-text">{errors.yearLevel}</p>
              )}
            </div>
          </div>

          <div className="register-row">
            <div className="register-input-box">
              <label>Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            <div className="register-input-box">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  updateField("confirmPassword", e.target.value)
                }
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>

          <div className="register-login-link">
            <p>Already have an account?</p>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span>Login here</span>
            </Link>
          </div>

          <Link to="/">
            <button type="button" className="register-home-btn">
              Back to Home
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Registration;
