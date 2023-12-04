import axios from './root.service';

// Actualizar una revisión existente
export const updateReview = async (reviewId, reviewData) => {
    try {
        const response = await axios.put(`/reviews/${reviewId}`, reviewData);
        return response.data;
    } catch (error) {
        console.error("Error updating review: ", error);
        throw error;
    }
};

// Obtener las revisiones por ID de postulación
export const fetchReviewsByApplication = async (applicationId) => {
    try {
        const response = await axios.get(`/reviews/application/${applicationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews: ", error);
        throw error;
    }
};