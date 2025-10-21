import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/auth/me');

// Tours
export const getTours = (params) => api.get('/tours', { params });
export const getTour = (id) => api.get(`/tours/${id}`);
export const createTour = (tourData) => api.post('/tours', tourData);
export const updateTour = (id, tourData) => api.put(`/tours/${id}`, tourData);
export const deleteTour = (id) => api.delete(`/tours/${id}`);
export const uploadTourImages = (id, formData) => 
  api.post(`/tours/${id}/upload-images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// Bookings
export const getBookings = (params) => api.get('/bookings', { params });
export const getBooking = (id) => api.get(`/bookings/${id}`);
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const updateBooking = (id, bookingData) => api.put(`/bookings/${id}`, bookingData);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// Reviews
export const getReviews = (params) => api.get('/reviews', { params });
export const createReview = (reviewData) => api.post('/reviews', reviewData);
export const updateReview = (id, reviewData) => api.put(`/reviews/${id}`, reviewData);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// Dashboard
export const getDashboardStats = () => api.get('/dashboard/stats');
export const getRevenueStats = (params) => api.get('/dashboard/revenue', { params });

// Profile
export const getProfile = () => api.get('/profile');
export const updateProfile = (profileData) => api.put('/profile', profileData);
export const uploadAvatar = (formData) => 
  api.post('/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
export const changePassword = (passwordData) => api.put('/profile/password', passwordData);

// Vouchers
export const getVouchers = (params) => api.get('/vouchers', { params });
export const getVoucher = (id) => api.get(`/vouchers/${id}`);
export const validateVoucher = (data) => api.post('/vouchers/validate', data);
export const createVoucher = (voucherData) => api.post('/vouchers', voucherData);
export const updateVoucher = (id, voucherData) => api.put(`/vouchers/${id}`, voucherData);
export const deleteVoucher = (id) => api.delete(`/vouchers/${id}`);
export const useVoucher = (id) => api.put(`/vouchers/${id}/use`);

export default api;
