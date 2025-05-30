// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Form from './views/Form/Form';
import Dashboard from './views/Dashboard/Dashboard';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/navbar/Navbar';
import Home from './views/Home/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundCircle from './views/BackgroundCircle/BackgroundCircle';
import FileUploadComponent from './components/forms/FileUploadDocument/FileUploadComponent';
import { MermaidWithInputBox } from './components/drawio/MermaidWithInputBox';
import { DrawioPage } from './components/drawio/DrawioPage';
import { DrawioPageTest } from './components/drawio/DrawioPageCopy';
import { DrawioPageAqua } from './components/drawio/DrawioPageAqua';
import { DrawioPageV2 } from './components/drawio/DrawioPageV2';
import { MermaidDiagram } from './components/forms/MermaidDiagram/MermaidDiagram';
import MermaidInput from './components/forms/MermaidDiagram/MermaidInput';
import ImageExplain from './components/text-to-audio/ImageExplain';
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
                <Route path="/editor" element={<MermaidWithInputBox/>} />
                <Route path="/editor-v2" element={<DrawioPage/>} />
                {/* Testing Page */}
                <Route path="/test" element={<DrawioPageTest/> } /> 
                <Route path="/editor-v3" element={<DrawioPageAqua/>} /> 
                <Route path="/editor-v2-1" element={<DrawioPageV2/>} />


                <Route path="/login" element={<Home />} />
                <Route path="/diagram" element={ <MermaidInput/>} />
                <Route path="/form" element={<ProtectedRoute element={<Form />} />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/forms/:project_id" element={<ProtectedRoute element={<Form />} />} />
                {/* Text to Audio */}
                <Route path="/audio-1" element={<ImageExplain />} />

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