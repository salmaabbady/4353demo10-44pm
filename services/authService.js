// services/authService.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const register = (email, password) => {
  return axios.post(`${API_URL}/auth/register`, { email, password });
};

const login = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export default {
  register,
  login,
};
