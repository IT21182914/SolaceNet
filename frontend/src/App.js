// App.js
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import ChatBot from './components/ChatBot';
import TherapistList from './components/TherapistList';
import ChatComponent from './components/ChatComponent';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/therapist" element={<TherapistList/>} />
        <Route path="/chat" element={<ChatComponent/>} />
      
      </Routes>
    </Router>
  );
}

export default App;