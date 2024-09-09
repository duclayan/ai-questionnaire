// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Form from './views/Form/Form';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Form />} />} />
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/form" element={<ProtectedRoute element={<Form />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          {/* <Route path="/project/:id" element={<Dashboard />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;