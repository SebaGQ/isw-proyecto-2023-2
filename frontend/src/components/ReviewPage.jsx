import React, { useState, useEffect } from 'react';
import { fetchReviews, fetchReviewsByStatus } from '../services/review.service';
import FilterReviews from '../components/FilterReviews';


const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cargar todas las revisiones al inicio
        loadReviews();
    }, []);

    const loadReviews = async (status = '') => {
        setLoading(true);
        try {
            const response = status ? await fetchReviewsByStatus(status) : await fetchReviews();
            setReviews(response);
        } catch (error) {
            console.error("Error loading reviews: ", error);
            // Manejar error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <FilterReviews onFilterChange={(status) => loadReviews(status)} />
            {/* Mostrar las revisiones */}
        </div>
    );
};

export default ReviewPage;
