// App.js
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import ChatBot from './components/ChatBot';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/chatbot" element={<ChatBot />} />

      
      </Routes>
    </Router>
  );
}

export default App;