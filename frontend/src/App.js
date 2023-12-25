// App.js
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/" element={<LoginForm />} />
      
      </Routes>
    </Router>
  );
}

export default App;