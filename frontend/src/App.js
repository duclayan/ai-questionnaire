// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Form from './views/Form/Form';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/navbar/Navbar';
import Home from './views/Home/Home';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/form" element={<ProtectedRoute element={<Form />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/forms/:project_id" element={<ProtectedRoute element={<Form />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;