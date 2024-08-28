import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './views/Form/Form';
import Login from './views/Login/Login';
import { Navbar } from "./components/navbar/Navbar";
import FormSubmitted from "./views/Form/FormSubmitted";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  
  const handleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
      <Navbar isLogin={isLogin} handleLogin={handleLogin} />
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form-submitted" element={<FormSubmitted/>} />

      </Routes>
    </Router>
  );
}

export default App;