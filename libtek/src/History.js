import React from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import './CSS/History.css'

export default function History() {
  const pastReservations = [
    {
      room: "Study Room 1",
      date: "November 20, 2025",
      time: "02:00 PM (2 hours)",
      status: "Completed",
    },
    {
      room: "Discussion Room 3",
      date: "November 18, 2025",
      time: "11:00 AM (3 hours)",
      status: "Completed",
    },
    {
      room: "Quiet Zone 1",
      date: "November 15, 2025",
      time: "09:00 AM (1 hour)",
      status: "Cancelled",
    },
  ];

  return (
    <div className="history-container">
      <Sidebar />

      <div className="history-content">
        <h1 className="history-title">Reservation History</h1>
        <p className="history-sub">View all your previous library space reservations</p>

        <div className="history-list">
          {pastReservations.length > 0 ? (
            pastReservations.map((item, index) => (
              <div className="history-card" key={index}>
                <div className="history-header">
                  <h3>{item.room}</h3>
                  <span className={`history-badge ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>

                <div className="history-info">
                  <p>📅 {item.date}</p>
                  <p>⏰ {item.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-history">No history found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
