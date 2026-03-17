import React, { createContext, useContext, useState } from 'react';
import { setToken as setApiToken } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (tokenValue, username) => {
    setToken(tokenValue);
    setUser(username);
    setApiToken(tokenValue);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setApiToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
