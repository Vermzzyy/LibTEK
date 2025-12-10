import React from 'react';
import './Hero.css';
import Logo from '../../Assets/logo.png';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="landing-container">

        <section className="hero-section">
          <img src={Logo} alt="Logo" className="hero-logo" />

          <h1 className="hero-title">Reserve Your Study Space</h1>
          <p className="hero-subtitle">
            Book library rooms and study areas with ease
          </p>

          <Link to="/register">
            <button className="hero-button">Get Started</button>
          </Link>
        </section>

        <section className="features-section">

          <div className="feature-card">
            <span className="icon">📅</span>
            <p className="feature-title">Easy Booking</p>
            <p className="feature-desc">Reserve spaces in just a few clicks</p>
          </div>

          <div className="feature-card">
            <span className="icon">⏱️</span>
            <p className="feature-title">Flexible Hours</p>
            <p className="feature-desc">Book for 1–4 hours based on your needs</p>
          </div>

          <div className="feature-card">
            <span className="icon">📚</span>
            <p className="feature-title">Multiple Spaces</p>
            <p className="feature-desc">Choose from study rooms, discussion areas, and more</p>
          </div>

          <div className="feature-card">
            <span className="icon">👥</span>
            <p className="feature-title">Group Friendly</p>
            <p className="feature-desc">Perfect for individual or group study sessions</p>
          </div>

          <div className="feature-card2">
            <h1 className="why-title">Why use our system?</h1>
            <ul className="why-list">
              <li>Realtime availability checking</li>
              <li>Manage all your reservations in one place</li>
              <li>Cancel or modify bookings easily</li>
              <li>Receive confirmation for all reservations</li>
            </ul>
          </div>

        </section>
      </div>

      <footer className="footer">
        <p>© 2025 LibTEK. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Hero;
