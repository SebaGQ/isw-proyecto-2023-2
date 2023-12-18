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

    
    // Función para eliminar un comentario
    const handleDeleteComment = (index) => {
        const newComments = comments.filter((_, i) => i !== index);
        setComments(newComments);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-container">
                <h2>Detalles de la Revisión</h2>
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="form-group">
                        <label>Nombre del Subsidio:</label>
                        <div className="info">{application.subsidyId.name}</div>

                        <label>RUT del Usuario:</label>
                        <div className="info">{application.rutUser}</div>

                        <label>Nombre del Solicitante:</label>
                        <div className="info">{application.firstName}</div>
                    </div>
                    <div className="form-group">
                        <label>Comentarios:</label>
                        {comments.map((comment, index) => (
                            <div key={index} className="comment-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={comment}
                                    onChange={(e) => handleCommentChange(index, e.target.value)}
                                />
                                <button type="button" className="btn-delete" onClick={() => handleDeleteComment(index)}>
                                    Eliminar
                                </button>
                            </div>
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
