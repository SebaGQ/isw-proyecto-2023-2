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

export const deleteSubsidy = async (subsidyId) => {
    try {
        const response = await axios.delete(`/subsidies/${subsidyId}`);
        return response.data.data;
    } catch (error) {
        console.error(`There was an error deleting the subsidy with ID ${subsidyId}: `, error);
        throw error;
    }
};

export const modifySubsidy = async (subsidyId, updatedData) => {
    try {
        const response = await axios.put(`/subsidies/${subsidyId}`, updatedData);
        return response.data.data;
    } catch (error) {
        console.error(`There was an error modifying the subsidy with ID ${subsidyId}: `, error);
        throw error;
    }
};
