import axios from './root.service';

export const fetchSubsidies = async () => {
    try {
        const response = await axios.get('/subsidies');

        if (response.status === 204) {
            return []; // Devuelve un array vacío en caso de 204 No Content
        }
        return response.data.data; // Asumiendo que los datos están en response.data.data
    } catch (error) {
        console.error("There was an error fetching the subsidies: ", error);
        throw error;
    }
};
