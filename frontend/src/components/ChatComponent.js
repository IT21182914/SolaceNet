import React, { useState, useEffect } from 'react';
import { initiateChat, getUserChats, getTherapistChats } from '../services/ChatService';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Update with your server URL

const ChatComponent = ({ user, therapist }) => {
  const [userChats, setUserChats] = useState([]);
  const [therapistChats, setTherapistChats] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      getUserChats(user._id)
        .then((data) => setUserChats(data.chats))
        .catch((error) => console.error('Error fetching user chats:', error));
    } else if (therapist) {
      getTherapistChats(therapist._id)
        .then((data) => setTherapistChats(data.chats))
        .catch((error) => console.error('Error fetching therapist chats:', error));
    }

    // Listen for incoming messages
    socket.on('receive-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, [user, therapist]);

  const handleInitiateChat = async () => {
    try {
      if (user && therapist) {
        await initiateChat(user._id, therapist._id);
        getUserChats(user._id)
          .then((data) => setUserChats(data.chats))
          .catch((error) => console.error('Error refreshing user chats:', error));
      }
    } catch (error) {
      console.error('Error initiating chat:', error);
    }
  };

  const handleSendMessage = () => {
    // Emit a message to the server
    socket.emit('send-message', { userId: user._id, therapistId: therapist._id, content: messageInput });
    setMessageInput('');
  };

  return (
    <div className="ChatComponent">
      <h2>Chat Component</h2>
      {user && (
        <div>
          <h3>User Chats</h3>
          <button onClick={handleInitiateChat}>Initiate Chat with Therapist</button>
          <ul>
            {userChats.map((chat) => (
              <li key={chat._id}>
                {JSON.stringify(chat)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {therapist && (
        <div>
          <h3>Therapist Chats</h3>
          <ul>
            {therapistChats.map((chat) => (
              <li key={chat._id}>
                {JSON.stringify(chat)}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h3>Chat Room</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              {message.content}
            </li>
          ))}
        </ul>
        <div>
          <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
