const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Generic request helper that handles JSON headers and Bearer token injection
 */
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('collabcode_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const authService = {
  // Check backend health
  checkHealth: () => request('/health', { method: 'GET' }),

  // User Registration
  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  // User Login
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  // Get current user profile (JWT protected)
  getMe: () => request('/auth/me', { method: 'GET' }),

  // Admin access test (Admin protected)
  testAdmin: () => request('/admin/test', { method: 'GET' }),
};

export default authService;
