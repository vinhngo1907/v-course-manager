import { axios } from "./axios";

export const find = async (queryPath = '') => {
    try {
        const response = await axios.get(`/videos${queryPath ? `?${queryPath}` : ''}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export const findOne = async (id, queryPath = '') => {
    try {
        const response = await axios.get(`/videos/${id}${queryPath ? `?${queryPath}` : ''}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export const create = async (data) => {
    try {
        const response = await axios.post(`/videos/create`, data);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export const update = async (id, data) => {
    try {
        const response = await axios.put(`/videos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export const remove = async (id) => {
    try {
        const response = await axios.delete(`/videos/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}