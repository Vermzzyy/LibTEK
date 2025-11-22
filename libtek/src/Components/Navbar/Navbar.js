import React from "react";
import "./Navbar.css";
import Logo from '../../Assets/logo.png'
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src={ Logo }
          className="navbar-logo"
          alt="CIT-U Logo"
        />
        <div className="navbar-title">
          <h1>Library Space Reservation</h1>
        </div>
      </div>

      <div className="nav-right">
        <Link to="/login">
          <button className="btn login-btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn register-btn">Register</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
