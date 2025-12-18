import axios from 'axios';

const HACKATHONS_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/hackathons';
// Derive members URL by replacing the endpoint or using a base. 
// Safest is to assume standard structure if VITE_API_URL is just the hackathon endpoint.
const MEMBERS_URL = HACKATHONS_URL.replace('/hackathons', '/members');

export const getHackathons = async () => {
    const response = await axios.get(HACKATHONS_URL);
    return response.data;
};

export const createHackathon = async (hackathonData) => {
    const response = await axios.post(HACKATHONS_URL, hackathonData);
    return response.data;
};

export const updateHackathon = async (id, hackathonData) => {
    const response = await axios.put(`${HACKATHONS_URL}/${id}`, hackathonData);
    return response.data;
};

export const deleteHackathon = async (id) => {
    const response = await axios.delete(`${HACKATHONS_URL}/${id}`);
    return response.data;
};

// Team Members API

export const getMembers = async () => {
    const response = await axios.get(MEMBERS_URL);
    return response.data;
};

export const createMember = async (memberData) => {
    const response = await axios.post(MEMBERS_URL, memberData);
    return response.data;
};

export const updateMember = async (id, memberData) => {
    const response = await axios.put(`${MEMBERS_URL}/${id}`, memberData);
    return response.data;
};

export const deleteMember = async (id) => {
    const response = await axios.delete(`${MEMBERS_URL}/${id}`);
    return response.data;
};
