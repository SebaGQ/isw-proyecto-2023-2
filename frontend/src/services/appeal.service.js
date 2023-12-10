import axios from './root.service';

export const postAppeal = async (appealData) => {
    try {
        const response = await axios.post('/appeals', appealData);
        return response.data;
    } catch (error) {
        console.error("Error posting appeal: ", error);
        throw error;
    }
};
