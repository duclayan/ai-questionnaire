import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
console.log("Protected Route")
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;