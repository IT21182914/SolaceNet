// frontend/src/components/Chat.js
import React, { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import './Chat.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000'); // Use your backend server URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);

    // Emit the message to the server
    socket.emit('send-message', { message, room: 'therapist-room' });
  };

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('receive-message', (data) => {
      const newMessage = {
        message: data.message,
        direction: 'incoming',
        sender: 'therapist',
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Stop simulating typing
      setIsTyping(false);
    });
  }, []);

  return (
    <div className="Chat">
      <h1>Helloooo</h1>
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="Therapist is typing" /> : null}
            style={{ flexDirection: 'column-reverse' }}
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
