// ReviewsComponent.jsx
import React, { useState, useEffect } from 'react';
import { getAllReviews } from '../../services/reviewService'

const ReviewsComponent = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const fetchedReviews = await getAllReviews();
            setReviews(fetchedReviews || []);
        };

        fetchReviews();
    }, []);

    return (
        <div>
            <h2>Reseñas</h2>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map(review => (
                        <li key={review._id}>
                            <p>Comentarios: {review.comments.join(", ")}</p>
                            <p>Estado: {review.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay reseñas disponibles.</p>
            )}
        </div>
    );
};

export default ReviewsComponent;
