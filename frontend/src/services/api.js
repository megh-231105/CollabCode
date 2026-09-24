const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (!err.status && err.name === 'TypeError') {
      // Network / connection refused error
      const networkError = new Error(
        'Unable to connect to backend server. Please make sure the backend is running on port 5000.'
      );
      networkError.status = 503;
      throw networkError;
    }
    throw err;
  }
};

export const authService = {
  checkHealth: () => request('/health', { method: 'GET' }),
  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  getMe: () => request('/auth/me', { method: 'GET' }),
  updateProfile: (data) =>
    request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

export const roomService = {
  getRooms: () => request('/rooms', { method: 'GET' }),
  getRoomById: (roomId) => request(`/rooms/${roomId}`, { method: 'GET' }),
  createRoom: (roomData) =>
    request('/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
    }),
  joinRoom: (roomId) =>
    request(`/rooms/${roomId}/join`, {
      method: 'POST',
    }),
  updateRoom: (roomId, updateData) =>
    request(`/rooms/${roomId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    }),
  deleteRoom: (roomId) =>
    request(`/rooms/${roomId}`, {
      method: 'DELETE',
    }),
};

export const codeService = {
  getSavedCode: () => request('/saved-code', { method: 'GET' }),
  saveCode: (snippetData) =>
    request('/saved-code', {
      method: 'POST',
      body: JSON.stringify(snippetData),
    }),
  deleteSavedCode: (id) =>
    request(`/saved-code/${id}`, {
      method: 'DELETE',
    }),
};

export const adminService = {
  getStats: () => request('/admin/stats', { method: 'GET' }),
  getUsers: () => request('/admin/users', { method: 'GET' }),
  getRooms: () => request('/admin/rooms', { method: 'GET' }),
  deleteUser: (id) => request(`/admin/users/${id}`, { method: 'DELETE' }),
  deleteRoom: (id) => request(`/admin/rooms/${id}`, { method: 'DELETE' }),
  testAdmin: () => request('/admin/test', { method: 'GET' }),
};

export default {
  auth: authService,
  rooms: roomService,
  code: codeService,
  admin: adminService,
};
