// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./views/Form/Form";
import Login from "./views/Login/Login";
import { Navbar } from "./components/navbar/Navbar";
import FormSubmitted from "./views/Form/FormSubmitted";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Form />
              </PrivateRoute>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form-submitted" element={<FormSubmitted />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
