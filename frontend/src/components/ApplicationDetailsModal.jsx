// ApplicationDetailsModal.jsx
import React from 'react';
import Modal from './Modal';
import Loading from '../components/Loading'; // Asegúrate de que la ruta de importación es correcta
import '../styles/ApplicationDetailsModal.css';

//Esta es del admin
const ApplicationDetailsModal = ({ isOpen, onClose, application, reviews, loadingReviews }) => {
    if (!application) return null;

    // Determinar si mostrar los motivos del rechazo
    const showRejectionReasons = reviews.length > 0 
    console.log(showRejectionReasons);
    console.log(reviews);
    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (


        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-container">
                <h2>Detalles de la Postulación</h2>
                <div className="details-content">
                    <p><strong>Tipo:</strong> {application.subsidyId.typeSubsidy}</p>
                    <p><strong>Nombre {application.subsidyId.typeSubsidy}:</strong> {application.subsidyId.name}</p>
                    <p><strong>Estado:</strong> {application.status}</p>
                    <p><strong>Nombre Postulante:</strong> {application.userId.firstName} {application.userId.lastName}</p>
                    <p><strong>RUT Postulante:</strong> {application.userId.rut}</p>
                    {/*<p><strong>Porcentaje Social:</strong> {application.socialPercentage}%</p>*/}
                    {/*<p><strong>Número de Miembros:</strong> {application.members}</p>*/}
                    <p><strong>Fecha de Postulación:</strong> {formatDate(application.applicationDate)}</p>

                    {showRejectionReasons && (
                        <div>
                            <h2>Comentarios:</h2>
                            <p>{reviews[reviews.length - 1].comments.join('. ')}</p>

                        </div>
                    )}


                <h2>Historial</h2>
                {loadingReviews ? (
                    <Loading />
                ) : reviews && reviews.length > 0 ? (
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Origen</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                                <th>Porcentaje Social</th>
                                <th>Cantidad Miembros</th>
                                <th>Comentarios</th> {/* Nueva columna para comentarios */}
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr key={index}>
                                    <td>{review.origin}</td>
                                    <td>{review.status}</td>
                                    <td>{formatDate(review.createdAt)}</td>
                                    <td>{review.socialPercentage} %</td>
                                    <td>{review.members}</td>
                                    <td>{review.comments.join('. ')}</td> {/* Mostrar comentarios */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay revisiones disponibles.</p>
                )}
                </div>
                </div>
        </Modal>


    );
};

export default ApplicationDetailsModal;
