import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
})

// Attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cs_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const loginUser = (data) => api.post('/api/auth/login', data)
export const registerUser = (data) => api.post('/api/auth/register', data)

// Carbon
export const calculate = (data) => api.post('/api/calculate', data)
export const getHistory = () => api.get('/api/history')

// Dashboard
export const getDashboardSummary = () => api.get('/api/dashboard/summary')
