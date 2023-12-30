// TherapistDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageCard from './MessageCard'; // Import the MessageCard component

const TherapistDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Replace with your actual authentication or session mechanism to get the therapist ID
        const therapistId = '658f747ae563dbf59ab08a07';

        const response = await axios.get(`http://localhost:8000/api/messages/${therapistId}`);
        setMessages(response.data.messages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Error fetching messages. Please try again.');
        setLoading(false);
      }
    };

    // Call the fetchMessages function when the component mounts
    fetchMessages();
  }, []); // Empty dependency array to ensure the effect runs once

  if (loading) {
    return <p>Fetching messages...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Therapist Dashboard</h2>
      {messages.map((message) => (
        <MessageCard key={message._id} message={message} />
      ))}
    </div>
  );
};

export default TherapistDashboard;
