// AdminReviewModal.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import { updateApplicationStatus } from '../services/application.service';
import '../styles/AdminReviewModal.css'; // Asegúrate de que la ruta es correcta

const AdminReviewModal = ({ isOpen, onClose, application, onReviewSuccess }) => {
    if (!application) return null;

    const [comments, setComments] = useState([]);
    const [status, setStatus] = useState(application.status);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateApplicationStatus(application._id, status, comments);
            if (onReviewSuccess) {
                onReviewSuccess(); // Llama a la función para actualizar los datos en la página principal
            }
            onClose();
        } catch (error) {
            console.error('Error al actualizar la aplicación:', error);
        }
    };

    const handleAddComment = () => {
        setComments([...comments, '']); // Agregar un nuevo comentario vacío
    };

    const handleCommentChange = (index, value) => {
        const newComments = [...comments];
        newComments[index] = value;
        setComments(newComments);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-container">
                <h2>Detalles de la Revisión</h2>
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="form-group">
                        <label htmlFor="status">Estado:</label>
                        <select id="status" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Rechazado">Rechazado</option>
                            <option value="Aceptado">Aceptado</option>
                            <option value="En Revisión">En Revisión</option>
                            <option value="Pendiente">Pendiente</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comentarios:</label>
                        {comments.map((comment, index) => (
                            <input
                                key={index}
                                type="text"
                                className="form-control"
                                value={comment}
                                onChange={(e) => handleCommentChange(index, e.target.value)}
                            />
                        ))}
                        <button type="button" className="btn btn-secondary" onClick={handleAddComment}>Agregar Comentario</button>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Enviar Revisión</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AdminReviewModal;
