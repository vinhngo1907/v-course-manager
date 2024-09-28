import { axios } from "./axios";

export const find = async (queryPath = '') => {
    try {
        const response = await axios.get(`/courses${queryPath ? `?${queryPath}` : ''}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export const findOne = async (id, queryPath = '') => {
    try {
        const response = await axios.get(`/courses/${id}${queryPath ? `?${queryPath}` : ''}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export const create = async (data) => {
    try {
        const response = await axios.post(`/courses/create`, data);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export const update = async (id, data) => {
    try {
        const response = await axios.put(`/courses/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export const remove = async (id) => {
    try {
        const response = await axios.delete(`/courses/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}