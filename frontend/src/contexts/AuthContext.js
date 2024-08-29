// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     const token = localStorage.getItem("authTokens");
  //     if (token) {
  //       const decodedToken = jwtDecode(JSON.parse(token).access);
  //       setUser(decodedToken);
  //     }
  //   }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
