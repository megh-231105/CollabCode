import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('collabcode_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('collabcode_token'));
  const [loading, setLoading] = useState(true);

  // Validate session on app initialization
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('collabcode_token');

      if (storedToken) {
        setToken(storedToken);
        try {
          const res = await authService.getMe();
          if (res && res.user) {
            setUser(res.user);
            localStorage.setItem('collabcode_user', JSON.stringify(res.user));
          }
        } catch (error) {
          console.warn('Session expired or backend offline:', error.message);
          // If token explicitly expired (401), log out
          if (error.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (newToken, userData) => {
    localStorage.setItem('collabcode_token', newToken);
    localStorage.setItem('collabcode_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('collabcode_token');
    localStorage.removeItem('collabcode_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'ADMIN',
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
