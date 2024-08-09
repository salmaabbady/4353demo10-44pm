// services/eventService.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const createOrUpdateEvent = (event) => {
  return axios.post(`${API_URL}/events`, event);
};

const getEvents = () => {
  return axios.get(`${API_URL}/events`);
};

export default {
  createOrUpdateEvent,
  getEvents,
};
