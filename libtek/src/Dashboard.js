import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Modal from "./Components/Modal/Modal";
import "./CSS/Dashboard.css";

export default function Dashboard() {
  const [upcomingReservations, setUpcoming] = useState([]);
  const [pastReservations, setPast] = useState([]);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const slidesPerView = 3;
  const [storedUserObj, setUser] = useState("");

  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    confirm: null,
    cancel: null,
  });

  useEffect(() => {
    const storedUserObj = JSON.parse(localStorage.getItem("user"));
    if (!storedUserObj) return;

    setUser(storedUserObj.firstname);

    fetch("https://libtekbackend-1.onrender.com/api/reservation/getAllReservations")
      .then((res) => res.json())
      .then((data) => {
        const userReservations = data.filter(
          (item) => item.user?.userId === storedUserObj.userId
        );

        setUpcoming(userReservations.filter((item) => item.status === "upcoming"));
        setPast(userReservations.filter((item) => item.status === "completed"));
      })
      .catch((err) => console.error("Error loading reservations:", err));
  }, []);

  const cancelReservation = (id) => {
    setModal({
      show: true,
      title: "Cancel Reservation?",
      message: "Are you sure you want to cancel this reservation?",
      confirm: async () => {
        setModal({ ...modal, show: false });

        await fetch(`http://localhost:8080/api/reservation/cancel/${id}`, {
          method: "PUT",
        });

        setUpcoming((prev) => prev.filter((item) => item.reservationId !== id));
      },
      cancel: () => setModal({ ...modal, show: false }),
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <Modal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={modal.confirm}
        onCancel={modal.cancel}
        onClose={() => setModal({ ...modal, show: false })}
      />

      <main className="dashboard-content">
        <div className="page-header">
          <h1>Welcome, {storedUserObj}!</h1>
          <p>Manage your library space reservations</p>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Reservations</h3>
            <span>{upcomingReservations.length + pastReservations.length}</span>
          </div>

          <div className="stat-card">
            <h3>Upcoming</h3>
            <span>{upcomingReservations.length}</span>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <span>{pastReservations.length}</span>
          </div>
        </div>

        <div className="section-header">
          <h2>Upcoming Reservations</h2>
          <Link to="/reservation" className="primary-btn">
            + New Reservation
          </Link>
        </div>

        <div className="slider-wrapper">
          <button
            className={`slide-btn left ${upcomingIndex === 0 ? "hidden" : ""}`}
            onClick={() => setUpcomingIndex((prev) => prev - 1)}
          >
            ◀
          </button>

          <div className="slider-track">
            {upcomingReservations.map((item, i) => (
              <div
                key={i}
                className="reservation-card"
                style={{ transform: `translateX(-${upcomingIndex * 100}%)` }}
              >
                <div className="res-top">
                  <h4>{item.booth?.boothName || "Unnamed Booth"}</h4>
                  <span className="badge upcoming">Upcoming</span>
                </div>

                <div className="res-info">
                  <p>📅 {formatDate(item.reservationDate)}</p>
                  <p>⏰ {item.reservationTime} ({item.duration})</p>
                  <p>📍 Library</p>
                </div>

                <button
                  className="cancel-btn"
                  onClick={() => cancelReservation(item.reservationId)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>

          <button
            className={`slide-btn right ${
              upcomingIndex >= upcomingReservations.length - slidesPerView
                ? "hidden"
                : ""
            }`}
            onClick={() => setUpcomingIndex((prev) => prev + 1)}
          >
            ▶
          </button>
        </div>
      </main>
    </div>
  );
}
