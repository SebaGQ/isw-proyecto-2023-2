import React, { useState, useEffect } from 'react';
import { fetchReviews } from '../services/review.service';
import ReviewList from '../components/ReviewList'; 
// import ReviewModal from '../components/ReviewModal'; // Un componente modal para detalles o edición de revisión
import '../styles/ReviewPage.css';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const ReviewPage = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [editingReview, setEditingReview] = useState(null);

  const handleReviewClick = (review) => {
        setSelectedReview(review);
        setIsReviewModalOpen(true);
    };

    const handleCreateReview = () => {
        navigate('/createreview');
    };
    const onEditReview = (review) => {
        setEditingReview(review);
        setIsReviewModalOpen(true);
    };

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const response = await fetchReviews();
                if (response.state === 'Success') {
                    setReviews(response.data); // Solo pasas el array de revisiones
                } else {
                    // Manejar otros estados, por ejemplo, errores
                    setError('Error al cargar las revisiones');
                }
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
            <button className="create-review-button" onClick={handleCreateReview}>Crear Revisión</button>
            {/* Aquí puedes incluir un componente de filtrado si es necesario */}
            <ReviewList reviews={reviews} onReviewClick={handleReviewClick} />
            {isReviewModalOpen && selectedReview && (
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                    review={selectedReview}
                    editingReview={editingReview}
                    onEditReview={onEditReview}
                />

            )}
        </div>
    );
};

export default ReviewPage;
