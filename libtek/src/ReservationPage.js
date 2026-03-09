import React, { useEffect, useState } from "react";
import "./CSS/ReservationPage.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Reservation() {
  const [booths, setBooths] = useState([]);
  const [selectedBooth, setSelectedBooth] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const [toast, setToast] = useState({ show: false, message: "" });

  const navigate = useNavigate();

  const showToast = (msg) => {
    setToast({ show: true, message: msg });

    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    const suffix = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    timeSlots.push(`${displayHour}:00 ${suffix}`);
  }

  useEffect(() => {
    fetch("https://libtekbackend-1.onrender.com/api/booth/getAllBooths")
      .then((res) => res.json())
      .then((data) => setBooths(data))
      .catch((err) => console.error("Error loading booths:", err));
  }, []);

  const handleSubmit = async () => {
    if (!selectedBooth || !date || !selectedTime || !duration) {
      showToast("Please complete all fields.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const reservationData = {
      reservationDate: date,
      reservationTime: selectedTime,
      duration: duration,
      status: "upcoming",
      user: { userId: user.userId },
      booth: { boothId: parseInt(selectedBooth) }
    };

    const res = await fetch(
      "https://libtekbackend-1.onrender.com/api/reservation/newReservation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData)
      }
    );

    if (res.ok) {
      showToast("Reservation created successfully!");
      setTimeout(() => navigate("/home"), 1200);
    } else {
      showToast("Failed to create reservation.");
    }
  };

  return (
    <div className="reservation-container">
      {toast.show && (
        <div className="toast success-toast">{toast.message}</div>
      )}

      <Sidebar />

      <div className="reservation-content">
        <div className="reservation-grid">
          <div className="reserve-box">
            <h2>Create Reservation</h2>
            <p className="desc">Select your preferred space and time</p>

            <div className="form-box">
              <label>Library Space</label>
              <select
                value={selectedBooth}
                onChange={(e) => setSelectedBooth(e.target.value)}
              >
                <option value="">Select a space</option>
                {booths.map((booth) => (
                  <option key={booth.boothId} value={booth.boothId}>
                    {booth.boothName} — Capacity: {booth.maxCapacity}
                  </option>
                ))}
              </select>

              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label>Time Slot</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <label>Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="">Select duration</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
              </select>
              
              <button className="confirm-btn" onClick={handleSubmit}>
                Confirm Reservation
              </button>
            </div>
          </div>

          <div>
            <h3 className="summary-header">Reservation Summary</h3>

            <div className="available-spaces">
              <h3>Available Spaces</h3>
              <p className="sub">Quick view of all library spaces</p>

              <div className="space-list">
                {booths.length === 0 && <p>No spaces available.</p>}

                {booths.map((booth) => (
                  <div className="space-item" key={booth.boothId}>
                    <div>
                      <h4>{booth.boothName}</h4>
                      <p>📍{booth.location}</p>
                    </div>
                    <span className="seat-tag">{booth.maxCapacity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
