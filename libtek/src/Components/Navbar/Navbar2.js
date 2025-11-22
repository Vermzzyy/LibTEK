import React from 'react'
import './Navbar.css'
import Logo from '../../Assets/logo.png'
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
     <nav className="navbar2">
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
          <button className="btn login-btn">Logout</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar2