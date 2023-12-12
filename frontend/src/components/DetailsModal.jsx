import React from 'react';
import Modal from './Modal'; // Asegúrate de que este componente ya esté creado y funcional

const DetailsModal = ({ isOpen, onClose, application, review }) => {
    if (!application) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Detalles de la Postulación</h2>
            <div className="details-content">
                <p><strong>Estado:</strong> {application.status}</p>
                <p><strong>Porcentaje Social:</strong> {application.socialPercentage}%</p>
                <p><strong>Número de Miembros:</strong> {application.members}</p>
                <p><strong>Fecha de Postulación:</strong> {new Date(application.applicationDate).toLocaleDateString()}</p>
                
                {application.status === 'Rechazado' && review && review.comments && (
                    <>
                        <h2>Motivos del Rechazo</h2>
                        <ul>
                            {review.comments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Otra información de revisión si es necesario */}
            </div>
        </Modal>
    );
};

export default DetailsModal;
