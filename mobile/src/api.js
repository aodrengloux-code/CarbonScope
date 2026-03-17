import axios from 'axios';

// Change this to your computer's local IP address
// Detected: 172.20.10.2 (from Expo logs)
const API_BASE = 'http://172.20.10.2:8080'; 

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

let authToken = null;

export const setToken = (token) => {
  authToken = token;
};

export const getToken = () => authToken;

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export const loginUser = (data) => api.post('/api/auth/login', data);
export const registerUser = (data) => api.post('/api/auth/register', data);
export const calculate = (data) => api.post('/api/calculate', data);
export const getHistory = () => api.get('/api/history');
export const getDashboardSummary = () => api.get('/api/dashboard/summary');

export default api;
