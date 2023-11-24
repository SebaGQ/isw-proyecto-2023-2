
import axios from 'axios';

const API_URL = 'http://localhost:80/api'; // Ajusta según tu configuración

export const getAllReviews = async () => {
    try {
        const response = await axios.get(`${API_URL}/reviews`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las reseñas', error);
    }
};
