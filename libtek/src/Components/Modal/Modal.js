import React from "react";
import "./Modal.css";

const Modal = ({ 
  show, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Confirm", 
  cancelText = "Cancel" 
}) => {

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-buttons">

          {confirmText && (
            <button className="modal-confirm" onClick={onConfirm}>
              {confirmText}
            </button>
          )}

          {cancelText && (
            <button className="modal-cancel" onClick={onCancel}>
              {cancelText}
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default Modal;
