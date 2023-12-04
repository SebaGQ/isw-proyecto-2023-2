import React, { useState, useEffect } from 'react';
import { fetchReviewsByApplication, createReview, updateReview } from '../services/review.service';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import Modal from '../components/Modal';
import '../styles/reviewPage.css'; 
import Loading from '../components/Loading';

const ReviewPage = ({ applicationId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    useEffect(() => {
        const getReviews = async () => {
            try {
                const data = await fetchReviewsByApplication(applicationId);
                setReviews(data);
            } catch (error) {
                setError('Error al cargar las revisiones');
                // Aquí podrías registrar el error o enviarlo a un servicio de monitoreo de errores
            } finally {
                setLoading(false);
            }
        };

        getReviews();
    }, [applicationId]);

    const handleEditReview = (review) => {
        setCurrentReview(review);
        setIsFormOpen(true);
    };

    const handleSubmitReview = async (reviewData) => {
        try {
            let response;
            if (currentReview && currentReview._id) {
                response = await updateReview(currentReview._id, reviewData);
            } else {
                response = await createReview({ ...reviewData, applicationId });
            }

            setReviews(prevReviews => {
                if (currentReview && currentReview._id) {
                    return prevReviews.map(r => r._id === currentReview._id ? response : r);
                } else {
                    return [...prevReviews, response];
                }
            });

            setIsFormOpen(false);
            setCurrentReview(null); // Limpiar la revisión actual
        } catch (error) {
            console.error("Error al procesar la revisión: ", error);
            // Manejar el error aquí
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Loading />
            </div>
        );
    }
    if (error) return <div>Ha ocurrido un error: {error}</div>;

    return (
        <div className="review-page-container">
            <div className="review-page-header">
                <h1>Revisiones de Postulaciones</h1>
                <p>Revisa y gestiona las postulaciones aquí.</p>
            </div>
            <div className="review-list-container">
                <ReviewList
                    reviews={reviews}
                    onEditReview={handleEditReview}
                />
                <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
                    <ReviewForm
                        initialData={currentReview}
                        onSubmit={handleSubmitReview}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default ReviewPage;
