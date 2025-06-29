/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const fetchExpenses = () => api.get('/expenses');
export const addExpense = (data: any) => api.post('/expenses', data);
export const approveExpense = (id: number) => api.patch(`/expenses/${id}/approve`);
export const rejectExpense = (id: number) => api.patch(`/expenses/${id}/reject`);
export const fetchAnalytics = () => api.get('/analytics');

export default api;