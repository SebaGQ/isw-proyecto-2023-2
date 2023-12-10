import React from 'react';
// import './ReviewList.css'; // Asegúrate de crear y enlazar un archivo CSS para este componente

const ReviewList = ({ reviews, onEditReview }) => {
    return (
        <div className="review-list">
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id} className="review-item">
                        <h3 className="review-title">Revisión de: {review.applicationId}</h3>
                        <p className="review-comments">Comentarios: {review.comments.join(", ")}</p>
                        <p className="review-status">Estado: {review.status}</p>
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
