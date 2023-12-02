// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Modal.css'; // Asegúrate de crear y enlazar un archivo de estilos para Modal

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button onClick={onClose} className="modal-close-button">Cerrar</button>
            </div>
        </div>,
        document.getElementById('modal-root') // Asegúrate de tener un div con este id en tu index.html
    );
};

export default Modal;
