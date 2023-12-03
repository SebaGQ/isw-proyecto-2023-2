import axios from './root.service';

export const fetchSubsidies = async () => {
    try {
        const response = await axios.get('/subsidies');
        return response.data.data;
    } catch (error) {
        console.error("There was an error fetching the subsidies: ", error);
        throw error;
    }
};