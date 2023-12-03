import axios from './root.service';

export const fetchApplications = async () => {
    try {
        const response = await axios.get('/applications');
        return response.data;
    } catch (error) {
        console.error("Error get applications: ", error);
        throw error;
    }
};

export const fetchApplicationsByUser = async () => {
    try {
        const response = await axios.get(`/applications/user`);
        return response.data;
    } catch (error) {
        console.error("Error get applications by user: ", error);
        throw error;
    }
};

export const postApplication = async (applicationData) => {
    try {
        const response = await axios.post('/applications', applicationData);
        return response.data;
    } catch (error) {
        console.error("Error posting application: ", error);
        throw error;
    }
};