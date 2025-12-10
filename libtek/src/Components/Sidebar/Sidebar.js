import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Sidebar/Sidebar.css";
import Logo from "../../Assets/logo.png";
import Modal from "../Modal/Modal";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    confirm: null,
    cancel: null,
  });

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setModal({
      show: true,
      title: "Logout?",
      message: "Are you sure you want to logout?",
      confirmText: "Logout",
      cancelText: "Cancel",
      confirm: () => {
        setModal({ ...modal, show: false });
        localStorage.removeItem("user");
        navigate("/login");
      },
      cancel: () => setModal({ ...modal, show: false }),
    });
  };

  return (
    <>
      <Modal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
        onConfirm={modal.confirm}
        onCancel={modal.cancel}
        onClose={() => setModal({ ...modal, show: false })}
      />

      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={Logo} alt="Logo" />
          <h2>Library Space Reservation System</h2>
        </div>

        <nav className="sidebar-links">
          <Link to="/home" className={isActive("/home") ? "active-link" : ""}>
            Dashboard
          </Link>

          <Link
            to="/reservation"
            className={isActive("/reservation") ? "active-link" : ""}
          >
            New Reservation
          </Link>

          <Link
            to="/history"
            className={isActive("/history") ? "active-link" : ""}
          >
            Reservation History
          </Link>

          <Link
            to="/settings"
            className={isActive("/settings") ? "active-link" : ""}
          >
            Settings
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
