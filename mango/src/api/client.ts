import axios from 'axios';

const raw = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const baseURL = raw.replace(/\/$/, '');

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
