import React from 'react'
import './Hero.css'
import Logo from '../../Assets/logo.png'
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <>
  <div className="landing-container">
      <section className="hero-section">
        <img
          src={ Logo }
          alt="Logo"
          className="hero-logo"
        />

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
          <div className="icon-placeholder"></div>
          <p className="feature-text">Easy Booking</p>
        </div>

        <div className="feature-card">
          <div className="icon-placeholder"></div>
          <p className="feature-text">Flexible Hours</p>
        </div>

        <div className="feature-card">
          <div className="icon-placeholder"></div>
          <p className="feature-text">Multiple Spaces</p>
        </div>

        <div className="feature-card">
          <div className="icon-placeholder"></div>
          <p className="feature-text">Group Friendly</p>
        </div>

        <div className="feature-card2">
          <h1>Why Use Our System?</h1>
          <ul>
            <li></li>
          </ul>
        </div>


      </section>

    </div>
                  <footer className="footer">
          <p></p>
        </footer>
        </>
  )
}

export default Hero