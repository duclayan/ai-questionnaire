// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Form from './views/Form/Form';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/navbar/Navbar';
import Home from './views/Home/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundCircle from './views/BackgroundCircle/BackgroundCircle';
import FileUploadComponent from './components/forms/FileUploadDocument/FileUploadComponent';
import { SVGPage } from './components/drawio/SVGPage';
import { DrawioPage } from './components/drawio/DrawioPage';
function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00695c', // Set your custom primary color here
      },
      secondary: {
        main: '#ff4081', // Optional: Set a custom secondary color
      },
    },
  });

  return (
      <BackgroundCircle>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Router>
              <Navbar/>
              <Routes>
                <Route path="/file-upload" element={<FileUploadComponent/>} />
                <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/editor" element={<SVGPage/>} />
                <Route path="/editor-v2" element={<DrawioPage/>} />

                <Route path="/login" element={<Home />} />
                <Route path="/form" element={<ProtectedRoute element={<Form />} />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/forms/:project_id" element={<ProtectedRoute element={<Form />} />} />
                
                {/* Redirect all unmatched routes to the dashboard */}
                <Route path="*" element={<ProtectedRoute element={<Dashboard />} />} />
              </Routes>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </BackgroundCircle>
  )
  ;
}

export default App;