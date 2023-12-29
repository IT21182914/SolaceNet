// components/TherapistDashboard.js
import React, { useState } from 'react';
import ChatRequest from './ChatRequest';

const TherapistDashboard = () => {
  const [chatRequests, setChatRequests] = useState([]);

  const handleAcceptRequest = (requestId) => {
    // Implement the logic to handle the acceptance of the chat request
    // You can update the state or make an API call to notify the backend
  };

  return (
    <div>
      <h2>Therapist Dashboard</h2>
      {chatRequests.map((request) => (
        <ChatRequest key={request.requestId} request={request} onAccept={handleAcceptRequest} />
      ))}
    </div>
  );
};

export default TherapistDashboard;
