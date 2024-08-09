// services/notificationService.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getNotifications = () => {
  return axios.get(`${API_URL}/notifications`);
};

export default {
  getNotifications,
};
