// services/userService.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const updateProfile = (profile) => {
  return axios.put(`${API_URL}/users/profile`, profile);
};

const getVolunteers = () => {
  return axios.get(`${API_URL}/users/volunteers`);
};

const matchVolunteerToEvent = (volunteerId, eventId) => {
  return axios.post(`${API_URL}/users/match`, { volunteerId, eventId });
};

const getVolunteerHistory = () => {
  return axios.get(`${API_URL}/users/history`);
};

export default {
  updateProfile,
  getVolunteers,
  matchVolunteerToEvent,
  getVolunteerHistory,
};
