import axios from './root.service';

// Crear una nueva revisión
export const createReview = async (reviewData) => {
    try {
        const response = await axios.post('/reviews', reviewData);
        return response.data;
    } catch (error) {
        console.error("Error creating review: ", error);
        throw error;
    }
};

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

// Obtener todas las revisiones
export const fetchReviews = async () => {
    try {
        const response = await axios.get('/reviews');

        if(response.status == 204){
            return[];
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews: ", error);
        throw error;
    }
};
