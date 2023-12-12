import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm'; 
// import './ReviewModal.css'; // Asegúrate de crear y enlazar un archivo CSS para este componente

const ReviewModal = ({ review, isOpen, onClose, onUpdate }) => {
    const [reviewData, setReviewData] = useState({
        comments: '',
        status: ''
    });

    useEffect(() => {
        if (review) {
            setReviewData({
                comments: review.comments.join(", "),
                status: review.status
            });
        }
    }, [review]);

    const handleSubmit = (data) => {
        onUpdate(review._id, data);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="review-modal">
            <div className="review-modal-content">
                <h2>Editar Revisión</h2>
                <ReviewForm onSubmit={handleSubmit} initialData={reviewData} />
                <button onClick={onClose} className="close-button">Cerrar</button>
            </div>
        </div>
    );
};

export default ReviewModal;
