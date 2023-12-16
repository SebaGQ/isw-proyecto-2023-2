import React from 'react';
import Modal from './Modal';

const DetailsModal = ({ isOpen, onClose, application, reviews }) => {
    if (!application) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Detalles de la Postulación</h2>
            <div className="details-content">
                <p><strong>Estado:</strong> {application.status}</p>
                <p><strong>Porcentaje Social:</strong> {application.socialPercentage}%</p>
                <p><strong>Número de Miembros:</strong> {application.members}</p>
                <p><strong>Fecha de Postulación:</strong> {new Date(application.applicationDate).toLocaleDateString()}</p>
                
                <h3>Historial</h3>
                {reviews && reviews.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Estado</th>
                                <th>Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr key={index}>
                                    <td>{review.state}</td>
                                    <td>{review.userId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay revisiones disponibles.</p>
                )}
            </div>
        </Modal>
    );
};

export default DetailsModal;
