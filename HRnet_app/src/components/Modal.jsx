import React from "react";

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    
    return (
        <div className="modal">
        
            <span className="close" onClick={onClose}>
            &times;
            </span>
            <p>Employee Created!</p>
        </div>
    );
    }
export default Modal;