import { axios } from './axios';

export const find = async (queryPath = '') => {
    try {
        const response = await axios.get(`/courses${queryPath ? `?${queryPath}` : ''}`);
        console.log({response})
        return response.data;
    } catch (e) {
        console.error(e.message);
        return null;
    }
};

export const create = async (data) => {
    try {
        const response = await axios.post("/courses", data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}
