import React from "react";
import "./CSS/Dashboard.css";
import { Link } from "react-router-dom";
import Navbar2 from './Components/Navbar/Navbar2'

const Dashboard = () => {
  const upcomingReservations = [
    {
      room: "Study Room 1",
      date: "November 20, 2025",
      time: "02:00 PM (2 hours)",
      location: "2nd Floor, Main Library",
      status: "upcoming",
    },
  ];

  const pastReservations = [
    {
      room: "Study Room 1",
      date: "November 20, 2025",
      time: "02:00 PM (2 hours)",
      status: "completed",
    },
  ];

  return (
    <>
    <Navbar2 />
    <div className="dashboard-container">
      <div className="dashboard-banner">
        <div className="welcome-text">
          <h2>Welcome to Your Dashboard</h2>
          <p>Manage your library space reservations</p>
        </div>

        <Link to="/reservation">
          <button className="new-res-btn">New Reservation</button>
        </Link>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <h3>Total Reservations</h3>
          <p>2</p>
        </div>

        <div className="stat-box">
          <h3>Upcoming</h3>
          <p>1</p>
        </div>

        <div className="stat-box">
          <h3>Completed</h3>
          <p>1</p>
        </div>
      </div>

      <h3 className="section-title">Upcoming Reservations</h3>
      {upcomingReservations.length > 0 ? (
        upcomingReservations.map((item, i) => (
          <div className="reservation-card" key={i}>
            <div className="res-header">
              <h4>{item.room}</h4>
              <span className="badge upcoming">upcoming</span>
            </div>

            <div className="res-details">
              <p>📅 {item.date}</p>
              <p>⏰ {item.time}</p>
              <p>📍 {item.location}</p>
            </div>

            <button className="cancel-btn">Cancel Reservation</button>
          </div>
        ))
      ) : (
        <p className="empty-text">No upcoming reservations.</p>
      )}

      <h3 className="section-title">Past Reservations</h3>
      {pastReservations.length > 0 ? (
        pastReservations.map((item, i) => (
          <div className="reservation-card" key={i}>
            <div className="res-header">
              <h4>{item.room}</h4>
              <span className="badge completed">completed</span>
            </div>

            <div className="res-details">
              <p>📅 {item.date}</p>
              <p>⏰ {item.time}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-text">No past reservations found.</p>
      )}
    </div>
    </>
  );
};

export default Dashboard;
