import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
})

export const calculate = (data) => api.post('/api/calculate', data)
export const getHistory = () => api.get('/api/history')
