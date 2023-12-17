import React from 'react';
import Modal from './Modal';
import Loading from '../components/Loading'; // Asegúrate de que la ruta de importación es correcta
import  '../styles/DetailsModal.css';

const DetailsModal = ({ isOpen, onClose, application, reviews, loadingReviews }) => {
    if (!application) return null; // Si no hay datos de la aplicación, no renderiza nada


    // Función para formatear la fecha en dd/mm/aaaa 00:00
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
            <h2>Detalles de la Postulación</h2>
            <div className="details-content">
                <p><strong>Estado:</strong> {application.status}</p>
                <p><strong>Porcentaje Social:</strong> {application.socialPercentage}%</p>
                <p><strong>Número de Miembros:</strong> {application.members}</p>
                <p><strong>Fecha de Postulación:</strong> {formatDate(application.applicationDate)}</p>
                
                <h2>Historial</h2>
                {loadingReviews ? (
                    // Si loadingReviews es true, muestra el componente Loading
                    <Loading />
                ) : reviews && reviews.length > 0 ? (
                    // Si hay revisiones, muestra la tabla de revisiones
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Origen</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                                <th>Porcentaje Social</th>
                                <th>Cantidad Miembros</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr key={index}>
                                    <td>{review.origin}</td>
                                    <td>{review.status}</td>
                                    <td>{formatDate(review.createdAt)}</td>
                                    <td className='socialPercentage'>{review.socialPercentage}</td>
                                    <td className='members'>{review.members}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    // Si no hay revisiones y no se está cargando, muestra un mensaje
                    <p>No hay revisiones disponibles.</p>
                )}
            </div>
        </Modal>
    );
};

export default DetailsModal;
