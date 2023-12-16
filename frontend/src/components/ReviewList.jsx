import React from 'react';
import '../styles/ReviewList.css';

const ReviewList = ({ reviews, onEditReview }) => {
    return (
        <div className="review-list">
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id} className="review-item">
                        {/* Información de la postulación */}
                        <h3 className="review-title">Postulante: {review.applicationId.rut[0]}</h3>
                        {/* crear if si es que no encuentra subsidioId.name*/}
                        <p className="review-subsidyName">Subsidio: {review.applicationId.subsidyId.name != null ? review.applicationId.subsidyId.name : "No se encuentra el subsidio"}</p>
                        <p className="review-socialPercentage">Porcentaje Social: {review.applicationId.socialPercentage}% {review.statusPercentage ? '✔' : '❌'}</p>
                        <p className="review-applicationDate">Fecha de Postulación: {new Date(review.applicationId.applicationDate).toLocaleDateString() }{review.statusDate ? ' ✔' : ' ❌'}</p>
                        <p className="review-members">Número de Miembros: {review.applicationId.members} {review.statusMembers ? '✔' : '❌'}</p>

                        {/* Información del review */}
                        <p className="review-comments">Comentarios: {review.comments.join(", ")}</p>
                        <p className="review-status">Estado: {review.status}</p>
                        <p className="review-origin">Origen: {review.origin}</p>

                        <button className="edit-button" onClick={() => onEditReview(review)}> Editar</button>
                    </div>
                ))
            ) : (
                <p>No hay revisiones disponibles.</p>
            )}
        </div>
    );
};

export default ReviewList;

