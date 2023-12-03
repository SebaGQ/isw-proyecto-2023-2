import React from 'react';
import Modal from './Modal'; // Asegúrate de que este componente ya esté creado y funcional

const DetailsModal = ({ isOpen, onClose, application }) => {
    if (!application) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Detalles de la Postulación</h2>
            <div className="details-content">
                <p><strong>Estado:</strong> {application.status}</p>
                <p><strong>Porcentaje Social:</strong> {application.socialPercentage}%</p>
                <p><strong>Número de Miembros:</strong> {application.members}</p>
                <p><strong>Fecha de Postulación:</strong> {new Date(application.applicationDate).toLocaleDateString()}</p>
                {/* Agrega más detalles si es necesario */}
                {application.review && (
                    <>
                        <h3>Revisión</h3>
                        <p><strong>Comentarios:</strong></p>
                        <ul>
                            {application.review.comments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default DetailsModal;
