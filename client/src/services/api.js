import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/hackathons';

export const getHackathons = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createHackathon = async (hackathonData) => {
    const response = await axios.post(API_URL, hackathonData);
    return response.data;
};

export const updateHackathon = async (id, hackathonData) => {
    const response = await axios.put(`${API_URL}/${id}`, hackathonData);
    return response.data;
};

export const deleteHackathon = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
