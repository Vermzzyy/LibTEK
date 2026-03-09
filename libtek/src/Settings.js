import React, { useState, useEffect } from 'react';
import './CSS/Settings.css';
import Sidebar from "./Components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Modal from "./Components/Modal/Modal";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    confirm: null,
    cancel: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setEmail(user.email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    setErrorMessage(""); 

    const user = JSON.parse(localStorage.getItem("user"));

    const requestData = {
      userId: user.userId,
      currentPassword,
      newPassword,
    };

    const res = await fetch("https://libtekbackend-1.onrender.com/api/user/updatePassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const result = await res.text();

    if (result.includes("incorrect")) {
      setErrorMessage("Current password is incorrect.");
      return;
    }

    setModal({
      show: true,
      title: "Password Updated",
      message: result,
      confirmText: "OK",
      cancelText: "",
      confirm: () => {
        setModal({ ...modal, show: false });
        navigate("/home");
      },
      cancel: null,
    });
  };

  const handleDeleteAccount = () => {
    setModal({
      show: true,
      title: "Delete Account?",
      message: "This action cannot be undone. Are you sure?",
      confirmText: "Delete",
      cancelText: "Back",
      confirm: async () => {
        setModal({ ...modal, show: false });

        const user = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `https://libtekbackend-1.onrender.com/api/user/deleteUser/${user.userId}`,
          { method: "DELETE" }
        );

        const result = await res.text();

        setModal({
          show: true,
          title: "Account Deleted",
          message: result,
          confirmText: "OK",
          cancelText: "",
          confirm: () => {
            localStorage.removeItem("user");
            navigate("/");
          },
          cancel: null,
        });
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

      <div className="settings-container">
        <Sidebar />

        <div className="settings-box">
          <div className="settings-header">SETTINGS</div>

          <div className="settings-title">
            <h3>Account Settings</h3>
            <p>Update your password</p>
          </div>

          <form className="settings-form" onSubmit={handleSubmit}>

            <div className="settings-input-box">
              <label>Email</label>
              <input type="email" value={email} disabled />
            </div>

            <div className="settings-input-box">
              <label>Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="settings-input-box">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="settings-input-box">
              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <p className="settings-error">{errorMessage}</p>
            )}

            <button className="save-btn" type="submit">
              Confirm Changes
            </button>

            <button 
              className="delete-btn"
              type="button"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
