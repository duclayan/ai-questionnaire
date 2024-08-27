// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './views/Form/Form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;