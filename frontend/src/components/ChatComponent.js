// frontend/src/components/ChatComponent.js
import React, { useState, useEffect } from 'react';
import Chat from './Chat'; // Import the Chat component created earlier

const ChatComponent = ({ user, therapist }) => {
  return (
    <div className="ChatComponent">
      {/* Render the Chat component with user and therapist props */}
      <Chat user={user} therapist={therapist} />
    </div>
  );
};

export default ChatComponent;
