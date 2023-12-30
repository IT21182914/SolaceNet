// frontend/src/components/TherapistDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageCard from './MessageCard'; // Import MessageCard component

const TherapistDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/messages');
        setMessages(response.data.messages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Therapist Dashboard</h2>
      {loading ? (
        <p>Fetching messages...</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message._id}>
              <MessageCard message={message} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TherapistDashboard;
