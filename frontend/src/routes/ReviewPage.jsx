import React, { useState, useEffect } from 'react';
import { fetchReviews } from '../services/review.service';
import ReviewList from '../components/ReviewList'; 
import ReviewModal from '../components/ReviewModal'; // Un componente modal para detalles o edición de revisión
// import '../styles/ReviewPage.css';
import Loading from '../components/Loading';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const handleReviewClick = (review) => {
        setSelectedReview(review);
        setIsReviewModalOpen(true);
    };

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const fetchedReviews = await fetchReviews();
                setReviews(fetchedReviews);
            } catch (error) {
                setError('Error al cargar las revisiones');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadReviews();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Loading />
            </div>
        );
    }
    if (error) return <div> Ha ocurrido un error: {error}</div>;

    return (
        <div className="review-page">
            <h1>Revisiones</h1>
            {/* Aquí puedes incluir un componente de filtrado si es necesario */}
            <ReviewList reviews={reviews} onReviewClick={handleReviewClick} />
            {isReviewModalOpen && selectedReview && (
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                    review={selectedReview}
                />
            )}
        </div>
    );
};

export default ReviewPage;
