// AdminReviewModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { updateApplicationStatus } from '../services/application.service';
import '../styles/AdminReviewModal.css'; // Asegúrate de que la ruta es correcta

const AdminReviewModal = ({ isOpen, onClose, application, onReviewSuccess, initialComments }) => { // Agrega initialComments como prop
    if (!application) return null;

    const [comments, setComments] = useState([]);
    const [status, setStatus] = useState(application.status);

    useEffect(() => {
        if (initialComments) {
            setComments(initialComments);
        }
    }, [initialComments]);

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

                        <label>Apellido del Solicitante:</label>
                        <div className="info">{application.lastName}</div>

                        <label>Miembros:</label>
                        <div className="info">{application.members}</div>

                        <label>Porcentaje Social:</label>
                        <div className="info">{application.socialPercentage}</div>

                    </div>
                    <div className="form-group">
                    <label htmlFor="status">Estado:</label>
                        <select id="status" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Rechazado">Rechazado</option>
                            <option value="Aceptado">Aceptado</option>
                            <option value="En Revisión">En Revisión</option>
                            <option value="Pendiente">Pendiente</option>
                        </select>
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
                        <button type="button" className="btn-secondary" onClick={handleAddComment}>Agregar Comentario</button>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-primary">Enviar Revisión</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AdminReviewModal;
