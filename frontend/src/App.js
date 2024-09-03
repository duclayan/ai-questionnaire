// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './views/Form/Form';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/form" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/project/:id" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;