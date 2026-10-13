import axios from 'axios';

/**
 * VendorLens Central Axios HTTP Client
 * 
 * Provides unified request configuration, base URL management,
 * and automatic Authorization header injection for Firebase tokens.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach Firebase ID token if available in storage or memory
api.interceptors.request.use(
  async (config) => {
    // In Milestone 3, we will dynamically inject the current Firebase user token:
    const token = localStorage.getItem('vendorlens_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Extract response data and normalize error payloads
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorPayload = error.response?.data?.error || {
      message: error.message || 'Network request failed. Please check your connection.',
      code: error.response?.status || 500,
    };
    return Promise.reject(errorPayload);
  }
);

export default api;
