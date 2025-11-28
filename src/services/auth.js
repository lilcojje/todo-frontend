// src/services/auth.js
import axios from 'axios';
import Swal from './sweetAlert';

const API_BASE = 'http://localhost:8000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'Your session has expired. Please login again.',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        window.location.href = '/login';
      });
    }
    return Promise.reject(error);
  }
);

class AuthService {
  async login(credentials) {
    try {
      const response = await axios.post(`${API_BASE}/api/login`, credentials);
      const { user, token } = response.data;

      if (token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set the token for future requests
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }

      await Swal.toast('success', 'Login successful!');
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      await Swal.error(message);
      return {
        success: false,
        message: message,
        errors: error.response?.data?.errors || {}
      };
    }
  }

  async register(userData) {
    try {
      const response = await axios.post(`${API_BASE}/api/register`, userData);
      const { user, token } = response.data;

      if (token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set the token for future requests
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }

      await Swal.toast('success', 'Registration successful!');
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      await Swal.error(message);
      return {
        success: false,
        message: message,
        errors: error.response?.data?.errors || {}
      };
    }
  }

  async logout() {
    try {
      // Only try to call logout if we have a token
      const token = localStorage.getItem('auth_token');
      if (token) {
        await api.post('/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      delete api.defaults.headers.Authorization;
      await Swal.toast('info', 'Logged out successfully');
      window.location.href = '/login';
    }
  }

  async getUser() {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }
}

export default new AuthService();
export { api };