// TherapistDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TherapistDashboard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/messages');
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Call the fetchMessages function when the component mounts
    fetchMessages();
  }, []); // Empty dependency array to ensure the effect runs once

  return (
    <div>
      <h2>Therapist Dashboard</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <strong>{message.sender}</strong>: {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TherapistDashboard;
