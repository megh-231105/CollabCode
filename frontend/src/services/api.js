/**
 * Automatically determine the backend API base URL
 * Handles localhost, custom VITE_API_URL, and production Vercel -> Render routing
 */
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;

  if (envUrl && envUrl.trim()) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    if (!clean.endsWith('/api') && !clean.includes('/api/')) {
      clean += '/api';
    }
    return clean;
  }

  // If running in browser: detect localhost, LAN IP, or deployed cloud domain
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isLocalOrLAN =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname);

    if (isLocalOrLAN) {
      return `http://${hostname}:5000/api`;
    }

    // Remote / Deployed production cloud backend
    return 'https://collabcode-0k7i.onrender.com/api';
  }

  // Local development fallback
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Generic request helper that handles JSON headers, Bearer token injection, and error formatting
 */
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('collabcode_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

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
      const networkError = new Error(
        'Unable to connect to the backend API. Please check your network connection or verify the backend service is running.'
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
  executeCode: async (language, code, stdin = '') => {
    try {
      // 1. Primary execution via backend API
      const res = await request('/execute', {
        method: 'POST',
        body: JSON.stringify({ language, code, stdin }),
      });
      return res;
    } catch (backendError) {
      console.warn('Backend execute route reached fallback, running direct sandbox runner:', backendError.message);
      
      const toB64 = (str) => {
        try {
          return window.btoa(unescape(encodeURIComponent(str || '')));
        } catch (e) {
          return window.btoa(str || '');
        }
      };

      const fromB64 = (str) => {
        if (!str) return '';
        try {
          return decodeURIComponent(escape(window.atob(str)));
        } catch (e) {
          return window.atob(str);
        }
      };

      const judge0Ids = {
        python: 71,
        py: 71,
        'c++': 54,
        cpp: 54,
        c: 50,
        java: 62,
        javascript: 63,
        js: 63,
      };

      const normalizedLang = (language || 'javascript').toLowerCase().trim();
      const langId = judge0Ids[normalizedLang] || 63;

      // 2. Direct Judge0 CE call
      try {
        const directRes = await fetch('https://ce.judge0.com/submissions?base64_encoded=true&wait=true', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language_id: langId,
            source_code: toB64(code),
            stdin: toB64(stdin || ''),
          }),
        });

        if (directRes.ok) {
          const data = await directRes.json();
          const stdout = fromB64(data.stdout);
          const stderr = fromB64(data.stderr);
          const compileOutput = fromB64(data.compile_output);
          const statusDesc = data.status?.description || 'Executed';
          const statusId = data.status?.id || 0;

          if (compileOutput && compileOutput.trim()) {
            return {
              success: true,
              language: normalizedLang,
              isError: true,
              status: 'Compilation Error',
              stdout: stdout || '',
              stderr: compileOutput,
              output: compileOutput,
              exitCode: 1,
              time: data.time,
            };
          }

          if (statusId !== 3 || stderr) {
            const isError = statusId !== 3;
            const combined = stdout + (stderr ? (stdout ? '\n' : '') + stderr : '');
            return {
              success: true,
              language: normalizedLang,
              isError,
              status: isError ? statusDesc : 'Success',
              stdout,
              stderr,
              output: combined || (isError ? statusDesc : '(No output)'),
              exitCode: isError ? (data.exit_code || 1) : 0,
              time: data.time,
            };
          }

          return {
            success: true,
            language: normalizedLang,
            isError: false,
            status: 'Success',
            stdout,
            stderr: '',
            output: stdout || '(Program executed successfully with no output)',
            exitCode: 0,
            time: data.time,
          };
        }
      } catch (clientErr) {
        console.warn('Direct Judge0 client execution failed:', clientErr.message);
      }

      // 3. Wandbox fallback
      const wandboxCompilers = {
        python: 'cpython-3.12.7',
        py: 'cpython-3.12.7',
        'c++': 'gcc-13.2.0',
        cpp: 'gcc-13.2.0',
        c: 'gcc-13.2.0-c',
        java: 'openjdk-jdk-21+35',
        javascript: 'nodejs-20.17.0',
        js: 'nodejs-20.17.0',
      };

      const wbComp = wandboxCompilers[normalizedLang] || 'nodejs-20.17.0';
      const wbRes = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          compiler: wbComp,
          code,
          stdin: stdin || '',
        }),
      });

      if (wbRes.ok) {
        const wbData = await wbRes.json();
        const compilerError = wbData.compiler_error || wbData.compiler_message || '';
        const programError = wbData.program_error || '';
        const programOutput = wbData.program_output || '';
        const isErr = wbData.status !== '0' || Boolean(compilerError) || Boolean(wbData.signal);

        return {
          success: true,
          language: normalizedLang,
          isError: isErr,
          status: isErr ? (compilerError ? 'Compilation Error' : 'Runtime Error') : 'Success',
          stdout: programOutput,
          stderr: compilerError || programError,
          output: compilerError || programError || programOutput || '(No output)',
          exitCode: parseInt(wbData.status, 10) || (isErr ? 1 : 0),
        };
      }

      throw new Error('All compiler sandbox engines were unreachable.');
    }
  },
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
